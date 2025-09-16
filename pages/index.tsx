import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from 'next-seo';

import Model from "../components/Model";

const game = require('../lib/text-rpg-engine.min');

// Extend Window interface for sceneInstance
declare global {
  interface Window {
    sceneInstance?: {
      controls?: {
        enabled: boolean;
      };
    };
  }
}

export default function Home() {
  const router = useRouter();

  const [userMessage, setUserMessage] = useState("");
  const [domLoaded, setDomLoaded] = useState(false);

  let counter = 0;
  const texts = [
    "a full-stack dev specializing in machine learning and generative AI works", 
    "a co-founder at manic.agency an open-source and writing collective", 
    'an artist formerly known as an "artist" formerly known as an artifice', 
    "a persona non grata to myself looking for forgiveness",
    "a part of a god split and scattered by a goddess and tasked to find its pieces again, just like you",
    "a (still) blank page of history that will survive only in severed memories"
  ];
  let timerId : any;
  let initedTimer = false;

  // Game data
  let data;

  const getData = async (filePath, fileType) => {
    try{ 
        const response = await fetch(filePath);
        switch (fileType.toUpperCase()) {
            case 'JSON':
               return response.json();
            default:
               return response;
        }
    } catch (error) {
        return error;
    }
  }

  useEffect(() => {

    // This is a hackey way for us to update statuses in the player
    // based on clicking the prompts. With a new update / version
    // to the text-rpg-engine library, this will be taken care already.
    document.addEventListener("click", function(){
      setTimeout(() => {
        updateStatuses();
        ensurePromptsVisible();
        // Re-enable three.js controls after any click to ensure potion stays interactive
        if (window.sceneInstance && window.sceneInstance.controls) {
          window.sceneInstance.controls.enabled = true;
        }
      }, 100);
    });

    setDomLoaded(true);

    if (domLoaded) {
      
      // Change the text of our subHeadings on a timer
      if (!initedTimer) {
        initedTimer = true;
        timerId = setInterval(function(){
          changeSubHeading();
        }, 5500);
      }
      // Below code loads game data from static JSON file
      fetchData();
      
      // Watch for dynamically added prompts
      const observer = new MutationObserver((mutations) => {
        let hasRelevantChanges = false;
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                // Check if it's a prompt or contains prompts
                if (element.classList?.contains('prompt') || 
                    element.querySelector?.('.prompt') ||
                    element.textContent?.includes('go further') ||
                    element.textContent?.includes('special entrance') ||
                    element.style?.cursor === 'pointer') {
                  hasRelevantChanges = true;
                  console.log('[DEBUG] Mutation detected - potential prompt added:', element.textContent?.substring(0, 50));
                }
              }
            });
          }
        });
        
        if (hasRelevantChanges) {
          setTimeout(() => {
            ensurePromptsVisible();
          }, 100);
        }
      });
      
      // Start observing both display and prompts containers
      const displayEl = document.getElementById('display');
      const promptsEl = document.getElementById('prompts');
      if (displayEl) {
        observer.observe(displayEl, { childList: true, subtree: true });

        // Additional observer specifically for room changes
        const roomChangeObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
                  const text = node.textContent || '';
                  // Check for room change indicators
                  if (text.includes('You enter') || text.includes('You are in') || text.includes('You find yourself')) {
                    console.log('[ROOM CONTENT CHANGE DETECTED] Forcing scroll to top');
                    setTimeout(() => {
                      displayEl.scrollTop = 0;
                      requestAnimationFrame(() => {
                        displayEl.scrollTop = 0;
                        setTimeout(() => displayEl.scrollTop = 0, 100);
                        setTimeout(() => displayEl.scrollTop = 0, 200);
                      });
                    }, 50);
                  }
                }
              });
            }
          });
        });
        roomChangeObserver.observe(displayEl, { childList: true, subtree: true, characterData: true });
      }
      if (promptsEl) {
        observer.observe(promptsEl, { childList: true, subtree: true });
      }
  }

  }, [router, domLoaded]);


  function changeSubHeading() {
    if (router.asPath === "/") {
      try {
          if (counter == texts.length - 1) {
            try {
              clearTimeout(timerId);
              document.getElementById("subHeading")?.classList.remove('shimmer');
            return;
            } catch (err) {
            }
          } else {
            try {
              document.getElementById("subHeading")?.setAttribute("class", "text-fade shimmer");
            setTimeout(() => {
              try {
                document.getElementById("subHeading").innerHTML = texts[counter];
                document.getElementById("subHeading")?.setAttribute("class", "text-show shimmer");
              } catch (err) {
              }
            }, 1050);
            counter ++;
          } catch (err) {
          }
        }
      } catch (err) {
      }
    }
  }

  const fetchData = async () => {
    getData('/game.json', 'json')
    .then((response) => {
      data = response;
      game.loadData(data);


      // Override Display.show to block error messages that come AFTER successful actions
      if (game.Display && game.Display.show) {
        const originalShow = game.Display.show.bind(game.Display);
        let lastRoomBeforeCommand = null;

        // Track room changes
        if (game.userSend) {
          const originalUserSend = game.userSend.bind(game);
          game.userSend = function(cmd) {
            lastRoomBeforeCommand = game.Player.currentRoom;
            const result = originalUserSend(cmd);

            // If room changed, the command was successful
            setTimeout(() => {
              if (game.Player.currentRoom !== lastRoomBeforeCommand) {
                console.log('[DEBUG] Command successful - room changed from', lastRoomBeforeCommand, 'to', game.Player.currentRoom);
              }
            }, 10);

            return result;
          };
        }

        game.Display.show = function(html) {
          // Block error messages that appear after the room already changed
          if (html && typeof html === 'string' && html.includes('No actions could be done from:')) {
            console.log('[DEBUG] Blocking error message:', html.substring(0, 100));
            return; // Don't show ANY "No actions" errors
          }
          return originalShow(html);
        };
      }

      game.init();

      // Override game.Player.currentRoom setter to detect room changes
      let _currentRoom = game.Player.currentRoom;
      Object.defineProperty(game.Player, 'currentRoom', {
        get: function() {
          return _currentRoom;
        },
        set: function(newRoom) {
          const oldRoom = _currentRoom;
          _currentRoom = newRoom;
          if (oldRoom !== newRoom) {
            console.log('[ROOM CHANGE DETECTED]', oldRoom, '->', newRoom);
            // Force scroll to top on ANY room change
            setTimeout(() => {
              const displayEl = document.getElementById('display');
              if (displayEl) {
                displayEl.scrollTop = 0;
                console.log('[FORCED SCROLL TO TOP ON ROOM CHANGE]');
                // Keep forcing it
                requestAnimationFrame(() => {
                  displayEl.scrollTop = 0;
                  setTimeout(() => displayEl.scrollTop = 0, 50);
                  setTimeout(() => displayEl.scrollTop = 0, 100);
                  setTimeout(() => displayEl.scrollTop = 0, 200);
                  setTimeout(() => displayEl.scrollTop = 0, 300);
                  setTimeout(() => displayEl.scrollTop = 0, 500);
                });
              }
            }, 100);
          }
        },
        enumerable: true,
        configurable: true
      });

      // Set initial game state
      const initialGameState = {
        currentRoom: game.Player.currentRoom || 'WelcomeRoom',
        inventory: game.Player.inventory?.items || []
      };
      localStorage.setItem('gameState', JSON.stringify(initialGameState));

      // Emit initial state
      const event = new CustomEvent('gameStateUpdate', { detail: initialGameState });
      window.dispatchEvent(event);

      // Make sure prompts are visible initially
      setTimeout(() => {
        console.log('[DEBUG] Initial prompt check after game init');
        ensurePromptsVisible();
        
        // Also try to manually check what the game has rendered
        const displayContent = document.getElementById('display')?.innerHTML;
        console.log('[DEBUG] Display content length:', displayContent?.length || 0);
        console.log('[DEBUG] Display content preview:', displayContent?.substring(0, 200));
        
        // Try to manually add test prompts if none are found
        const promptsContainer = document.getElementById('prompts');
        if (promptsContainer && promptsContainer.children.length === 0) {
          console.log('[DEBUG] No prompts found, adding default prompts for room:', game.Player?.currentRoom);
          
          // Add default prompts based on the room
          const defaultPrompts = [
            { text: 'go further', command: 'go further' },
            { text: 'look around', command: 'look' },
            { text: 'check inventory', command: 'inventory' }
          ];
          
          // If in WelcomeRoom, add specific prompts
          if (game.Player?.currentRoom === 'WelcomeRoom' || game.Player?.currentRoom === 'Beginning') {
            defaultPrompts.push({ text: 'special entrance', command: 'special entrance' });
            defaultPrompts.push({ text: "i'm in charge here", command: "i'm in charge here" });
            defaultPrompts.push({ text: 'how was this created?', command: 'how was this created?' });
          }
          
          defaultPrompts.forEach(promptData => {
            const promptEl = document.createElement('div');
            promptEl.className = 'prompt';
            promptEl.textContent = promptData.text;
            // Apply inline styles directly when creating - will be overridden by CSS media queries
            promptEl.style.cssText = ``;
            promptEl.onclick = () => {
              console.log('[DEBUG] Manual prompt clicked:', promptData.command);
              const previousRoom = game.Player.currentRoom;
              game.userSend(promptData.command);
              setTimeout(() => {
                const currentRoom = game.Player.currentRoom;
                console.log('[DEBUG] Room check - Previous:', previousRoom, 'Current:', currentRoom);
                const displayEl = document.getElementById('display');
                if (displayEl) {
                  if (previousRoom !== currentRoom) {
                    // New room - scroll to top to show new room description
                    console.log('[DEBUG] New room - forcing scroll to top');
                    displayEl.scrollTop = 0;
                    requestAnimationFrame(() => {
                      displayEl.scrollTop = 0;
                      setTimeout(() => displayEl.scrollTop = 0, 100);
                      setTimeout(() => displayEl.scrollTop = 0, 200);
                      setTimeout(() => displayEl.scrollTop = 0, 300);
                    });
                  } else {
                    // Same room - scroll to bottom to show the result/error
                    console.log('[DEBUG] Same room - scrolling to bottom');
                    displayEl.scrollTop = displayEl.scrollHeight;
                  }
                }
                updateStatuses();
                ensurePromptsVisible();
              }, 500);
            };
            promptsContainer.appendChild(promptEl);
            console.log('[DEBUG] Added manual prompt:', promptData.text);
          });
        }
      }, 1000);

      // Send user input to our game (on pressing 'Enter' in the form)
      document.getElementById('input').addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
          // event.preventDefault();
          // game.userSend(document.getElementById('input').value);
          // document.getElementById('input').value = '';
          afterSubmission(event)
        }
      });
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
  }

  function handleChange(e) {
    e.preventDefault();
    setUserMessage( e.target.value)
  }

 function afterSubmission(event) {
    event.preventDefault();
    const previousRoom = game.Player.currentRoom;
    let command = (document.getElementById('input') as HTMLInputElement).value;

    // Check if the typed command matches a prompt name and translate to keyword
    if (game && game.Player && game.Player.currentRoom && data) {
      const currentRoomData = data.game?.rooms?.find(r => r.name === game.Player.currentRoom);
      if (currentRoomData && currentRoomData.prompts) {
        // First check if it matches a prompt name exactly (case insensitive)
        const matchingPrompt = currentRoomData.prompts.find(p =>
          p.name.toLowerCase() === command.toLowerCase()
        );
        if (matchingPrompt && matchingPrompt.keywords && matchingPrompt.keywords.length > 0) {
          console.log('[DEBUG] Typed command matches prompt "' + command + '", using keyword: "' + matchingPrompt.keywords[0] + '"');
          command = matchingPrompt.keywords[0];
        }
      }
    }

    game.userSend(command);
    (document.getElementById('input') as HTMLInputElement).value = '';
    setTimeout(() => {
      const currentRoom = game.Player.currentRoom;
      console.log('[DEBUG] Command typed - Previous room:', previousRoom, 'Current room:', currentRoom);
      const displayEl = document.getElementById('display');

      // If we're in the same room (action failed or examining), scroll to bottom
      // If we changed rooms, scroll to top
      if (displayEl) {
        if (previousRoom !== currentRoom) {
          // New room - scroll to top to show new room description
          console.log('[DEBUG] New room - forcing scroll to top');
          displayEl.scrollTop = 0;
          requestAnimationFrame(() => {
            displayEl.scrollTop = 0;
            setTimeout(() => displayEl.scrollTop = 0, 100);
            setTimeout(() => displayEl.scrollTop = 0, 200);
            setTimeout(() => displayEl.scrollTop = 0, 300);
          });
        } else {
          // Same room - scroll to bottom to show the result/error
          console.log('[DEBUG] Same room - scrolling to bottom');
          displayEl.scrollTop = displayEl.scrollHeight;
        }
      }

      updateStatuses();
      ensurePromptsVisible();
    }, 500);
}

function ensurePromptsVisible() {
  console.log('[DEBUG] ensurePromptsVisible called');
  
  // Make sure prompt buttons are visible
  const promptsContainer = document.getElementById('prompts');
  const promptsWrapper = document.getElementById('prompts-wrapper');
  console.log('[DEBUG] Prompts container found:', !!promptsContainer);
  console.log('[DEBUG] Prompts wrapper found:', !!promptsWrapper);
  
  if (promptsContainer) {
    // Debug container visibility
    const containerStyles = window.getComputedStyle(promptsContainer);
    console.log('[DEBUG] Container visibility:', {
      display: containerStyles.display,
      visibility: containerStyles.visibility,
      opacity: containerStyles.opacity,
      height: promptsContainer.offsetHeight,
      width: promptsContainer.offsetWidth,
      position: containerStyles.position
    });
    
    // Don't override the grid layout that's already set
    // Just ensure visibility
    promptsContainer.style.visibility = 'visible';
    promptsContainer.style.opacity = '1';
    
    const existingPrompts = promptsContainer.querySelectorAll('.prompt');
    console.log('[DEBUG] Existing prompts in container:', existingPrompts.length);
    
    // Debug: Check if prompts are actually visible
    existingPrompts.forEach((prompt, i) => {
      const el = prompt as HTMLElement;
      const styles = window.getComputedStyle(el);
      console.log(`[DEBUG] Prompt ${i} visibility:`, {
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity,
        height: el.offsetHeight,
        width: el.offsetWidth,
        text: el.textContent?.substring(0, 30)
      });
      
      // Remove forced inline styles to allow CSS media queries to work
      el.style.display = 'block';
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    });
    
    if (existingPrompts.length === 0) {
      // If no prompts found, check if they might be in the display area
      const displayArea = document.getElementById('display');
      console.log('[DEBUG] Display area found:', !!displayArea);
      
      if (displayArea) {
        const displayPrompts = displayArea.querySelectorAll('.prompt');
        console.log('[DEBUG] Prompts found in display area:', displayPrompts.length);
        
        displayPrompts.forEach((prompt, index) => {
          console.log(`[DEBUG] Moving prompt ${index}:`, prompt.textContent);
          // Move prompts to the prompts container
          const clonedPrompt = prompt.cloneNode(true) as HTMLElement;
          promptsContainer.appendChild(clonedPrompt);
        });
        
        // Remove prompts from display area
        displayPrompts.forEach(prompt => prompt.remove());
        console.log('[DEBUG] Removed prompts from display area');
      }
      
      // Also check for any divs with onclick that might be prompts
      const allDivs = displayArea?.querySelectorAll('div[onclick]');
      console.log('[DEBUG] Divs with onclick found:', allDivs?.length || 0);
      
      // Check for any elements that look like prompts
      const potentialPrompts = displayArea?.querySelectorAll('div[style*="cursor: pointer"], span[style*="cursor: pointer"], p[style*="cursor: pointer"]');
      console.log('[DEBUG] Potential prompt elements with cursor:pointer:', potentialPrompts?.length || 0);
    }
    
    // Add click handlers to all prompts
    const finalPrompts = promptsContainer.querySelectorAll('.prompt');
    console.log('[DEBUG] Final prompts in container after processing:', finalPrompts.length);
    
    // Debug scrolling issue
    const promptsContainerEl = document.getElementById('prompts-container');
    if (promptsContainerEl) {
      setTimeout(() => {
        const containerHeight = promptsContainerEl.offsetHeight;
        const scrollHeight = promptsContainerEl.scrollHeight;
        const innerHeight = promptsContainer.scrollHeight;
        console.log('[DEBUG] Container height:', containerHeight);
        console.log('[DEBUG] Container scrollHeight:', scrollHeight);
        console.log('[DEBUG] Inner prompts height:', innerHeight);
        console.log('[DEBUG] Should scroll?', scrollHeight > containerHeight);
        console.log('[DEBUG] Number of prompts:', finalPrompts.length);
        
        // Log each prompt's height
        finalPrompts.forEach((prompt, i) => {
          const el = prompt as HTMLElement;
          console.log(`[DEBUG] Prompt ${i} height:`, el.offsetHeight);
        });
      }, 200);
    }
    
    finalPrompts.forEach((prompt, index) => {
      if (!prompt.hasAttribute('data-handler-added')) {
        console.log(`[DEBUG] Adding handler to prompt ${index}:`, (prompt as HTMLElement).textContent);
        prompt.addEventListener('click', function(e) {
          const target = e.currentTarget as HTMLElement;
          let command = target.dataset.myDataContent || target.textContent;

          // Try to find the matching prompt and use its first keyword
          // This is needed because the game engine sometimes doesn't match prompt names
          if (game && game.Player && game.Player.currentRoom && data) {
            const currentRoomData = data.game?.rooms?.find(r => r.name === game.Player.currentRoom);
            if (currentRoomData && currentRoomData.prompts) {
              const matchingPrompt = currentRoomData.prompts.find(p => p.name === command);
              if (matchingPrompt && matchingPrompt.keywords && matchingPrompt.keywords.length > 0) {
                console.log('[DEBUG] Using keyword "' + matchingPrompt.keywords[0] + '" for prompt "' + command + '"');
                command = matchingPrompt.keywords[0];
              }
            }
          }

          console.log('[DEBUG] Sending to game:', command);
          const previousRoom = game.Player.currentRoom;
          game.userSend(command);

          // Use a slightly longer timeout to ensure the game has updated
          setTimeout(() => {
            const currentRoom = game.Player.currentRoom;
            console.log('[DEBUG] Prompt click - Previous room:', previousRoom, 'Current room:', currentRoom);

            const displayEl = document.getElementById('display');
            if (displayEl) {
              // Always scroll to top if room changed
              if (previousRoom !== currentRoom) {
                console.log('[DEBUG] Room changed - forcing scroll to top');
                // Force scroll to top multiple times to ensure it sticks
                displayEl.scrollTop = 0;
                requestAnimationFrame(() => {
                  displayEl.scrollTop = 0;
                  setTimeout(() => {
                    displayEl.scrollTop = 0;
                  }, 100);
                  setTimeout(() => {
                    displayEl.scrollTop = 0;
                  }, 200);
                  setTimeout(() => {
                    displayEl.scrollTop = 0;
                  }, 300);
                });
              } else {
                // Same room - scroll to bottom to show the result/error
                console.log('[DEBUG] Same room - scrolling to bottom');
                displayEl.scrollTop = displayEl.scrollHeight;
              }
            }
            updateStatuses();
            ensurePromptsVisible();
          }, 500);
        });
        prompt.setAttribute('data-handler-added', 'true');
      }
    });
  }
  
  // Debug: Check what the game engine thinks the current room is
  if (typeof game !== 'undefined' && game.Player) {
    console.log('[DEBUG] Current room:', game.Player.currentRoom);
    console.log('[DEBUG] Player inventory:', game.Player.inventory);
  }
}

function updateStatuses() {
  let status = "";

  if (router.asPath === "/") {

    if (game.Player.inventory.items.includes("drunkSmallPotion")) {
      status += "You feel smaller now. "
    }
    if (game.Player.inventory.items.includes("drunkBigPotion")) {
      status += "You feel normal again. "
    }
    if (game.Player.inventory.items.includes("weightedHeart")) {
      status += "You feel more burdened inside. "
    }
    if (game.Player.inventory.items.includes("weightedBack")) {
      status += "Your body feels more burdened. "
    }
    if (game.Player.inventory.items.includes("hourglassOfRestoration")) {
      status += "You feel wiser now. "
    }
    if (game.Player.currentRoom === 'DungeonAdventureStayInsideRoom') {
      status += "<br> You are content now."
      try {
        document.getElementById('sendButton').style.display = 'none';
        (document.getElementById('input') as HTMLInputElement).disabled = true;
        (document.getElementById('input') as HTMLInputElement).placeholder = "there is nothing more that you could want";
      } catch (err) {
      }
    }
    try {
      document.getElementById('status').innerHTML = status;
    } catch (err) {
    }
    
    // Update localStorage and emit event for footer to update
    const gameState = {
      currentRoom: game.Player.currentRoom,
      inventory: game.Player.inventory.items
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
    
    // Emit custom event
    const event = new CustomEvent('gameStateUpdate', { detail: gameState });
    window.dispatchEvent(event);
  }
}

  return (
    <>
    <NextSeo
      title="Johnny's Place - Portfolio"
      description="Homepage for Johnny Dunn. Portfolio of works here."
    />
    <style jsx global>{`
      /* Custom scrollbar for game display and prompts */
      #display, #prompts-container {
        scrollbar-width: thin;
        scrollbar-color: rgba(var(--accent-primary-rgb), 0.5) rgba(var(--accent-primary-rgb), 0.1);
      }
      
      #display::-webkit-scrollbar, #prompts-container::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      #display::-webkit-scrollbar-track, #prompts-container::-webkit-scrollbar-track {
        background: rgba(var(--accent-primary-rgb), 0.1);
        border-radius: 4px;
      }
      
      #display::-webkit-scrollbar-thumb, #prompts-container::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
        border-radius: 4px;
        border: 1px solid rgba(var(--bg-primary-rgb), 0.2);
        min-height: 30px;
      }
      
      #display::-webkit-scrollbar-thumb:hover, #prompts-container::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, var(--accent-secondary) 0%, var(--accent-primary) 100%);
      }
      
      /* Scrollbar for prompts container */
      #prompts-container {
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
      }
      
      /* Mobile optimizations */
      @media (max-width: 768px) {
        .prompt {
          width: calc(50% - 0.25rem) !important;
          margin-bottom: 0.5rem;
          padding: 0.6rem 0.8rem;
          min-height: 40px;
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 40px;
          line-height: 1.4;
        }
        
        #prompts-container {
          height: 150px !important;
          max-height: 150px !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
        }
        
        #prompts {
          padding: 0.75rem !important;
          min-height: 100% !important;
        }
        
        #game {
          min-height: auto !important;
          height: auto !important;
          max-height: calc(100vh - 200px) !important;
          margin: 0.5rem !important;
          border-width: 2px !important;
        }
        
        #display {
          font-size: 0.9rem !important;
          height: 180px !important;
          max-height: 180px !important;
          padding: 0.75rem !important;
        }
        
        #player {
          display: none !important;
        }
        
        .firstCol {
          margin-bottom: 1rem !important;
        }
        
        #scene-container {
          width: 100% !important;
          max-width: 300px !important;
          height: 300px !important;
          margin: 0 auto !important;
        }
        
        #canvasId {
          touch-action: pan-y pinch-zoom !important;
        }
      }
      
      @media (max-width: 480px) {
        #scene-container {
          max-width: 250px !important;
          height: 250px !important;
        }
        
        #game {
          margin: 0.25rem !important;
          border-radius: 6px !important;
        }
        
        #display {
          height: 150px !important;
          padding: 0.5rem !important;
          font-size: 0.85rem !important;
        }
        
        #prompts-container {
          height: 120px !important;
          max-height: 120px !important;
        }
        
        #prompts {
          padding: 0.5rem !important;
          gap: 0.35rem !important;
        }
        
        .prompt {
          width: calc(50% - 0.175rem) !important;
          padding: 0.5rem 0.6rem !important;
          font-size: 0.8rem !important;
          height: 36px !important;
          min-height: 36px !important;
        }
        
        input#input {
          font-size: 0.9rem !important;
          padding: 0 0.75rem !important;
          height: 38px !important;
        }
        
        #sendButton svg {
          width: 24px !important;
          height: 24px !important;
        }
      }
      
      /* Very small screens */
      @media (max-width: 380px) {
        .prompt {
          width: 100% !important;
          margin-bottom: 0.35rem !important;
        }
        
        #prompts {
          flex-direction: column !important;
        }
      }

      /* Enhanced Victorian prompt styles */
      .prompt {
        margin: 0;
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, 
          rgba(var(--bg-primary-rgb), 0.9) 0%, 
          rgba(var(--accent-primary-rgb), 0.08) 50%, 
          rgba(var(--bg-primary-rgb), 0.9) 100%);
        border: 2px solid rgba(var(--accent-primary-rgb), 0.3);
        border-radius: 6px;
        color: var(--accent-primary);
        font-family: 'Crimson Text', serif;
        font-style: italic;
        font-size: 0.85rem;
        letter-spacing: 0.02em;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        display: block;
        box-shadow: 0 2px 8px rgba(var(--accent-primary-rgb), 0.1);
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
        width: calc(50% - 0.25rem);
        height: 36px;
        line-height: 1.3;
        -webkit-tap-highlight-color: rgba(var(--accent-primary-rgb), 0.2);
        user-select: none;
      }
      
      .prompt:hover {
        background: linear-gradient(135deg, 
          rgba(var(--accent-primary-rgb), 0.15) 0%, 
          rgba(var(--accent-secondary-rgb), 0.15) 100%);
        border-color: var(--accent-primary);
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(var(--accent-primary-rgb), 0.25);
        z-index: 1;
      }
      
      /* Style for display text */
      #display {
        color: var(--accent-primary) !important;
        font-family: 'Crimson Text', serif;
        font-size: 1.05rem;
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }
      
      #display p {
        color: var(--accent-primary) !important;
        margin: 0.5rem 0;
      }
      
      #display b {
        color: var(--accent-secondary);
        font-weight: 600;
      }
      
      /* Style for fail/success text */
      .failText {
        font-style: italic;
        font-weight: bold;
        margin: 1rem 0;
        color: #f85149;
        padding: 0.75rem;
        border-left: 3px solid #f85149;
        background: rgba(248, 81, 73, 0.1);
        font-family: 'Crimson Text', serif;
      }
      
      .successText {
        font-style: italic;
        font-weight: bold;
        margin: 1rem 0;
        color: #3fb950;
        padding: 0.75rem;
        border-left: 3px solid #3fb950;
        background: rgba(63, 185, 80, 0.1);
        font-family: 'Crimson Text', serif;
      }
      
      /* Light mode adjustments */
      :global(html:not(.dark)) #display,
      :global(html:not(.dark)) #display p,
      :global(html:not(.dark)) .prompt {
        color: #8B6914 !important;
      }
      
      :global(html:not(.dark)) #game {
        background: linear-gradient(135deg, 
          rgba(254, 253, 248, 0.98) 0%, 
          rgba(255, 255, 255, 0.95) 100%) !important;
        border-color: #B8860B !important;
        box-shadow: 0 20px 40px rgba(139, 105, 20, 0.15), 
                    0 0 60px rgba(139, 105, 20, 0.05), 
                    inset 0 1px 0 rgba(184, 134, 11, 0.1) !important;
      }
      
      :global(html:not(.dark)) #display::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #B8860B 0%, #DAA520 100%) !important;
      }
      
      :global(html:not(.dark)) .prompt {
        background: linear-gradient(135deg, 
          rgba(255, 255, 255, 0.9) 0%, 
          rgba(184, 134, 11, 0.08) 50%, 
          rgba(255, 255, 255, 0.9) 100%) !important;
        border-color: rgba(184, 134, 11, 0.3) !important;
        color: #8B6914 !important;
      }
      
      :global(html:not(.dark)) .prompt:hover {
        background: linear-gradient(135deg, 
          rgba(184, 134, 11, 0.15) 0%, 
          rgba(218, 165, 32, 0.15) 100%) !important;
        border-color: #B8860B !important;
      }
      
      /* Inventory items */
      .inventoryItem {
        color: var(--accent-primary);
        font-family: 'Crimson Text', serif;
        font-size: 0.85rem;
        margin: 0.25rem 0;
        padding-left: 1rem;
      }
      
      .inventoryItem:before {
        content: '◆ ';
        color: var(--accent-secondary);
        margin-right: 0.5rem;
      }
    `}</style>
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={'grid grid-cols-1 lg:grid-cols-2 gap-3'}>
          <div className={'firstCol'}>
            <AnimatePresence>
              <motion.div
                className={styles.left_col_top}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    scale: 0.8,
                    opacity: 0,
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 0.4,
                      duration: 0.4,
                    },
                  },
                }}
                style={{marginTop: '5px', marginLeft: '10px', padding: '0.75rem'}}
              >
                <h2 className="glitch" style={{marginBottom: '2px', marginTop: '5px', fontSize: '1.4em'}}>I AM</h2>
                <div style={{display: 'inline'}} className="glitch2">
                  <h1 style={{display: 'inline', fontSize: '1.6em', letterSpacing: '1px', fontWeight: '700', fontFamily: 'Playfair Display, serif'}} className="willHide">JOHNNY</h1>
                  <h1 style={{marginLeft: '6px', display: 'inline', fontSize: '1.6em', letterSpacing: '1px', fontWeight: '700', fontFamily: 'Playfair Display, serif'}} className="willHide">DUNN</h1>
                </div>
                <div className={styles.subHeadingContainer} style={{marginTop: '3px'}}>
                  <h3 id="subHeading" className="shimmer" style={{fontSize: '0.95em'}}>a full-stack dev specializing in web3 and machine learning projects</h3>
                </div>
              </motion.div>
            </AnimatePresence>
              <div style={{ display: "flex", gap: "10px", marginTop: '-20px', marginBottom: '0px' }}>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      x: "-100px",
                      opacity: 0,
                    },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        delay: 0.4,
                        duration: 0.4,
                      },
                    },
                  }}
                  // eslint-disable-next-line react/jsx-no-comment-textnodes
                >

                </motion.p>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      x: "100px",
                      opacity: 0,
                    },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        delay: 0.4,
                        duration: 0.4,
                      },
                    },
                  }}
                  whileHover={{
                    scale: [1, 1.4, 1.2],
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  // a new player emerges
                </motion.p>
              </div>
              {domLoaded && (
                <>
                <AnimatePresence>
                <motion.div
                  className={styles.left_col_top}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      scale: 0.8,
                      opacity: 0,
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: 0.4,
                        duration: 0.4,
                      },
                    },
                  }}
                >
                  <div id="player" style={{
                    padding: '0.5rem',
                    paddingBottom: '0',
                    marginTop: '0',
                    color: 'var(--accent-primary)',
                    fontFamily: 'Crimson Text, serif',
                    fontSize: '1rem',
                    fontStyle: 'italic'
                  }}>
                    <h4 style={{
                      color: 'var(--accent-secondary)',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      marginBottom: '0.25rem',
                      marginTop: '0'
                    }}>Player</h4>
                    <div id="status" style={{
                      maxWidth: '400px',
                      marginLeft: '0.5rem',
                      color: 'var(--accent-secondary)',
                      fontStyle: 'italic',
                      fontSize: '0.95rem',
                      lineHeight: 1.4,
                      opacity: 0.9
                    }}>
                    </div>
                    <h4 id="inventoryList" style={{
                      color: 'var(--accent-secondary)',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      marginTop: '0.5rem',
                      marginBottom: '0.25rem'
                    }}></h4>
                    <div id="inventory" style={{
                      color: 'var(--accent-primary)',
                      fontSize: '0.9rem'
                    }}>
                    </div>
                  </div>
                    <div id="game" suppressHydrationWarning style={{
                      maxWidth: '900px',
                      width: '100%',
                      margin: '0.5rem auto',
                      position: 'relative',
                      background: 'linear-gradient(135deg, rgba(var(--page-bg-rgb), 0.98) 0%, rgba(var(--bg-primary-rgb), 0.95) 100%)',
                      border: '3px solid var(--accent-primary)',
                      borderRadius: '8px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 60px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(var(--accent-primary-rgb), 0.1)',
                      fontFamily: 'Crimson Text, serif',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
                      lineHeight: 1.7,
                      color: 'var(--accent-primary)',
                      backdropFilter: 'blur(15px)',
                      overflow: 'hidden',
                      minHeight: '430px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {/* Scrollable content area with custom scrollbar */}
                      <div id="display" style={{
                        flex: '1 1 auto',
                        minHeight: '150px',
                        maxHeight: '300px',
                        padding: 'clamp(0.75rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem)',
                        overflow: 'auto',
                        color: 'var(--accent-primary)',
                        fontSize: 'inherit',
                        lineHeight: 1.5,
                        textAlign: 'justify',
                        WebkitOverflowScrolling: 'touch'
                      }}></div>
                      {/* Input section */}
                      <div style={{
                        flex: '0 0 auto',
                        borderTop: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                        padding: 'clamp(0.75rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem)',
                        background: 'rgba(var(--accent-primary-rgb), 0.02)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'stretch',
                          gap: '0.5rem'
                        }}>
                          <input
                              type="text"
                              value={userMessage}
                              id="input" 
                              onChange={handleChange}
                              placeholder="Write something..."
                              style={{
                                flex: 1,
                                height: 'clamp(40px, 8vh, 50px)',
                                padding: '0 clamp(0.75rem, 3vw, 1.5rem)',
                                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                                background: 'rgba(var(--bg-primary-rgb), 0.8)',
                                border: '2px solid rgba(var(--accent-primary-rgb), 0.3)',
                                borderRadius: '8px',
                                color: 'var(--accent-primary)',
                                fontFamily: 'Crimson Text, serif',
                                fontStyle: 'italic',
                                letterSpacing: '0.02em',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                              }}
                            />
                          
                          <button 
                            onClick={afterSubmission} 
                            id="sendButton" 
                            aria-label="Send command" 
                            className={styles.quillButton}
                          >
                            <svg 
                              width="32" 
                              height="32" 
                              viewBox="0 0 32 32" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              className={styles.quillIcon}
                            >
                              <defs>
                                <linearGradient id="quillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="var(--accent-primary)" />
                                  <stop offset="100%" stopColor="var(--accent-secondary)" />
                                </linearGradient>
                              </defs>
                              {/* Elegant quill feather */}
                              <path 
                                d="M26 4C26 4 24 2 20 2C16 2 12 4 10 8C8 12 8 16 8 18L10 20L12 18C12 16 12 14 14 12C16 10 18 8 22 8C24 8 26 8 26 6V4Z"
                                fill="url(#quillGradient)"
                                opacity="0.9"
                                className={styles.quillFeather}
                              />
                              {/* Quill shaft */}
                              <path 
                                d="M8 18L4 28L6 30L8 28L10 20"
                                stroke="url(#quillGradient)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                fill="none"
                                className={styles.quillShaft}
                              />
                              {/* Quill tip */}
                              <path
                                d="M4 28L3 30L5 29L4 28Z"
                                fill="var(--accent-secondary)"
                                className={styles.quillTip}
                              />
                              {/* Decorative flourish */}
                              <path
                                d="M14 12C14 12 16 10 18 10"
                                stroke="var(--accent-secondary)"
                                strokeWidth="1"
                                strokeLinecap="round"
                                opacity="0.5"
                                className={styles.quillDetail}
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Prompts section inside the book - for choice inputs */}
                      <div id="prompts-container" style={{
                        flex: '0 0 auto',
                        minHeight: '120px',
                        maxHeight: '200px',
                        borderTop: '1px solid rgba(var(--accent-primary-rgb), 0.1)',
                        background: 'rgba(var(--accent-primary-rgb), 0.02)',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        position: 'relative',
                        WebkitOverflowScrolling: 'touch'
                      }}>
                        <div id="prompts" style={{
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          alignContent: 'flex-start',
                          justifyContent: 'space-between'
                        }}>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  </AnimatePresence>
                  </>
                )}
            </div>
            <div className={'secondCol'}>
              <Model game={game} onSceneInit={(scene) => { window.sceneInstance = scene; }}/>
            </div>
        </div>
    </div>
  </div>
  </>
  );
}
