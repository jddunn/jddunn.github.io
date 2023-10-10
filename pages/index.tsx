import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from 'next-seo';

import Model from "../components/Model";

const game = require('../lib/text-rpg-engine.min');

export default function Home() {
  const router = useRouter();

  const [userMessage, setUserMessage] = useState("");
  const [domLoaded, setDomLoaded] = useState(false);

  let counter = 0;
  const texts = [
    "a full-stack dev specializing in web3 and machine learning projects", 
    "a co-founder amongst a small team of builders and hackers", 
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
      updateStatuses();
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
      // Add event listeners for prompt buttons
      // document.querySelectorAll(".prompt").forEach(i => 
      //   i.addEventListener(
      //   "click",
      //   e => {
      //     game.userSend(e.currentTarget.dataset.myDataContent);
      //   }));
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
      game.init();

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
    game.userSend((document.getElementById('input') as HTMLInputElement).value);
    (document.getElementById('input') as HTMLInputElement).value = '';
    updateStatuses();
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
  }
}

  return (
    <>
    <NextSeo
      title="Johnny's Place - Portfolio"
      description="Homepage for Johnny Dunn. Portfolio of works here."
    />
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3'}>
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
                style={{marginTop: '20px', marginLeft: '10px'}}
              >
                <h2 className="glitch" style={{marginBottom: '10px', marginTop: '20px', fontSize: '1.8em'}}>I AM</h2>
                <div style={{display: 'inline', paddingTop: '40px'}} className="glitch2"><h1 style={{display: 'inline', fontSize: '1.8em', letterSpacing: '2px', marginTop: '20px'}} className="willHide">JOHNNY</h1><h1 style={{paddingTop: '20px', marginLeft: '6px', display: 'inline', fontSize: '1.8em', letterSpacing: '2px', marginTop: '20px'}} className="willHide">DUNN</h1></div>
                <h3 id="subHeading" className="shimmer">a full-stack dev specializing in web3 and machine learning projects</h3>
              </motion.div>
            </AnimatePresence>
              <div style={{ display: "flex", gap: "10px", marginTop: '40px' }}>
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
                  {" "}
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
                  <div id="player">
                    <h4>Player</h4>
                    <div id="status">
                    </div>
                    <h4 id="inventoryList"></h4>
                    <div id="inventory">
                    </div>
                  </div>
                    <div id="game" suppressHydrationWarning>
                      <div id="display"></div>
                      <div id="inputContainer">
                        <input
                            type="text"
                            value={userMessage}
                            // ref="input"
                            id="input"
                            onChange={handleChange}
                            placeholder="say or do something"
                          />  
                          <button onClick={afterSubmission} id="sendButton">send</button>
                      </div>
                      <div id="prompts">
                      </div>
                    </div>
                  </motion.div>
                  </AnimatePresence>
                  </>
                )}
            </div>
            <div className={'secondCol'}>
              <Model game={game}/>
            </div>
        </div>
    </div>
  </div>
  </>
  );
}
