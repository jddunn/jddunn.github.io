/* eslint-disable react/jsx-no-comment-textnodes */
import style from "../styles/About.module.scss";
import { BsFolderFill, BsArrowRightSquareFill } from "react-icons/bs";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AiTwotoneEye, AiFillEye } from "react-icons/ai";

import { NextSeo } from 'next-seo';

const About = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [showReactNext, setShowReactNext] = useState(true);
  const [showUILib, setShowUILib] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showBackendLanguages, setShowBackendLanguages] = useState(false);
  const [showBackendLib, setShowBackendLib] = useState(false);
  const [showDatabases, setShowDatabases] = useState(false);
  const [showUnityGames, setShowUnityGames] = useState(false);
  const [showUnityARVR, setShowUnityARVR] = useState(false);
  const [showDevOpsCloudPlatforms, setShowDevOpsCloudPlatforms] = useState(false);
  const [showDevOpsCloudTools, setShowDevOpsCloudTools] = useState(false);
  const [showHardwareGeneral, setShowHardwareGeneral] = useState(false);
  const [showHardware3DModel, setShowHardware3DModel] = useState(false);
  const [showArtDesignGeneral, setShowArtDesignGeneral] = useState(false);
  const [showArtDesignTools, setShowArtDesignTools] = useState(false);
  const [showAudioGeneral, setShowAudioGeneral] = useState(false);
  const [showAudioTools, setShowAudioTools] = useState(false);

  function collapse(collapseFlag: boolean) {
    if (!collapseFlag) {
      setShowReactNext(true);
      setShowArtDesignGeneral(true);
      setShowArtDesignTools(true);
      setShowAudioGeneral(true);
      setShowAudioTools(true);
      setShowBackendLanguages(true);
      setShowBackendLib(true);
      setShowDatabases(true);
      setShowDevOpsCloudPlatforms(true);
      setShowDevOpsCloudTools(true);
      setShowHardware3DModel(true);
      setShowHardwareGeneral(true);
      setShowTools(true);
      setShowUILib(true);
      setShowUnityARVR(true);
      setShowUnityGames(true);
    } else {
      setShowReactNext(false);
      setShowArtDesignGeneral(false);
      setShowArtDesignTools(false);
      setShowAudioGeneral(false);
      setShowAudioTools(false);
      setShowBackendLanguages(false);
      setShowBackendLib(false);
      setShowDatabases(false);
      setShowDevOpsCloudPlatforms(false);
      setShowDevOpsCloudTools(false);
      setShowHardware3DModel(false);
      setShowHardwareGeneral(false);
      setShowTools(false);
      setShowUILib(false);
      setShowUnityARVR(false);
      setShowUnityGames(false);
    }
  }


  return (

    <>
    <NextSeo
      title="Johnny's Place - About Me"
      description="Place for Johnny Dunn. Learn about me here."
    />
    <div className={style.about}>
      <div className={style.skill_menu} onClick={() => setShowMenu(!showMenu)}>
        {" "}
        {showMenu ? <AiFillEye/> : <AiTwotoneEye />}
      </div>

      <div className={style.left}>
        <motion.div
          className={style.left_number}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              y: "100px",
              opacity: 0,
            },
            visible: {
              y: "-370px",
              opacity: 1,
              transition: {
                type: "spring",
                delay: 0.2,
                duration: 2,
              },
            },
          }}
        >
          <span className={style.text_fade_01}>14</span>
          <span className={style.text_fade_01}>15</span>
          <span className={style.text_fade_01}>16</span>
          <span className={style.text_fade_01}>17</span>
          <span className={style.text_fade_01}>18</span>
          <span className={style.text_fade_01}>19</span>
          <span className={style.text_fade_01}>20</span>
          <span className={style.text_fade_01}>21</span>
          <span className={style.text_fade_01}>22</span>
          <span className={style.text_fade_01}>23</span>
          <span className={style.text_fade_01}>24</span>
          <span className={style.text_fade_01}>25</span>
          <span className={style.text_fade_01}>26</span>
          <span className={style.text_fade_01}>27</span>
          <span className={style.text_fade_01}>28</span>
          <span className={style.text_fade_01}>29</span>
          <span className={style.text_fade_02}>30</span>
          <span className={style.text_fade_03}>31</span>
          <span>32</span>
          <span>33</span>
          <span>34</span>
          <span>35</span>
          <span>36</span>
          <span>37</span>
          <span>38</span>
          <span>39</span>
          <span>40</span>
          <span>39</span>
          <span>41</span>
          <span>42</span>
          <span>43</span>
          <span>44</span>
          <span>45</span>
          <span>46</span>
          <span>47</span>
          <span>48</span>
          <span>49</span>
          <span>50</span>
          <span className={style.text_fade_03}>51</span>
          <span className={style.text_fade_02}>52</span>
          <span className={style.text_fade_01}>53</span>
        </motion.div>
        <div className={style.left_line}></div>
        <div className={style.left_line2}></div>
        <motion.div
          className={style.left_about}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              y: "350px",
              opacity: 0,
            },
            visible: {
              y: "0px",
              opacity: 1,
              transition: {
                type: "spring",
                delay: 0.2,
                duration: 3,
              },
            },
          }}
        >
          <span className={style.ml_2}> /**</span>
          <span><span className="disappearing">*</span><h1 className="font-bold tracking-tighter leading-tight md:pr-8 inline" style={{color: 'white'}}> // About me</h1></span>
          <span><span className="disappearing">*</span><span> I have 6 years of experience in full-stack,</span></span>
          <span><span className="disappearing">*</span><span> development mainly focusing on backend work.</span></span>
          <span><span className="disappearing">*</span><span> I've contracted with multiple projects over</span></span>
          <span><span className="disappearing">*</span><span> the years successfully creating E2E machine</span></span>
          <span><span className="disappearing">*</span><span> learning applications based around NLP and</span></span>
          <span><span className="disappearing">*</span><span> CV. I've also worked in blockchain-related</span></span>
          <span><span className="disappearing">*</span><span> teams developing custom smart contracts and</span></span>
          <span><span className="disappearing">*</span><span> NFTs. I've a wide breadth of skills and am a</span></span>
          <span><span className="disappearing">*</span><span> tech generalist. I graduated in 2017 with a</span></span>
          <span><span className="disappearing">*</span><span> BFA in Design & Technology / Game Design. I</span></span>
          <span><span className="disappearing">*</span><span> want to work on platforms and products that </span></span>
          <span><span className="disappearing">*</span><span> focus user experience and expression. </span></span>
          <span><span className="disappearing">*</span><span> See my resume <a href='/Johnny-Dunn-Resume-2023.pdf' style={{color: 'rgb(176,196,222)'}} target='_blank'>here</a>.</span></span>
          <span><span className="disappearing">*</span><span> </span></span>
          <span><span className="disappearing">*</span><span> Email me at <a href='mailto:johnnyfived@protonmail.com' style={{color: 'rgb(176,196,222)'}} target='_blank'>johnnyfived@protonmail.com</a></span></span>
          <span><span className="disappearing">*</span><span> for inquiries and work.</span></span>
          <span className={style.ml_2}>*/</span>
        </motion.div>
      </div>
      {showMenu && (
        <motion.div
          className={style.right}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              x: "100px",
              opacity: 0,
              transition: {
                type: "spring",
                delay: .2,
              },
            },
            visible: {
              x: "0",
              opacity: 1,
              transition: {
                type: "spring",
                delay: .2,
              },
            },
          }}
        >
          <div className={style.right_container}>
            <h3>Skills & Interests</h3>
            <button className="outline outline-offset-2 outline-1 mt-1 mr-5 ml-2 mb-2 p-1" onClick={() => collapse(true)}>Collapse</button>
            <button className="outline outline-offset-2 outline-1 mt-1 mb-2 p-1" onClick={() => collapse(false)}>Expand</button>
            <div className={style.right_interest}>
              {/* <span> */}
                {/* <FiChevronDown /> */}
              {/* </span> */}
              <span style={{ marginLeft: "5px" }}>Frontend</span>
              <div className={style.skill}>
                <div
                  onClick={() => setShowReactNext(!showReactNext)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showReactNext ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(175,183,10)" }}>
                    <BsFolderFill />
                  </span>
                  <span> React / Next</span>
                </div>
                <AnimatePresence>
                  {showReactNext && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Reusable components
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> SSR
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> SEO
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> React-Query
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Redux and Redux Toolkit (RTK)
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Zustand
                      </span>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowUILib(!showUILib)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showUILib ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(136,192,208)" }}>
                    <BsFolderFill />
                  </span>
                  <span> UI Libraries</span>
                </div>
                <AnimatePresence>
                  {showUILib && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Material-UI
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Tailwind CSS
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> ChakraUI
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> NextUI
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Babel
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Webpack
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> PostCSS
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> SASS
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Framer
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Three.js / React-three / React-three-fiber
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Vis.js
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Bootstrap
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Kibana (ELK stack)
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.right_interest}>
              {/* <span>
                <FiChevronDown />
              </span> */}
              <span style={{ marginLeft: "5px" }}>Mobile</span>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowTools(!showTools)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showTools ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(191,97,106)" }}>
                    <BsFolderFill />
                  </span>
                  <span> Tools</span>
                </div>
                <AnimatePresence>
                  {showTools && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Unity3D cross-platform apps
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Android Studio
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Electron / Capacitor / Ionic
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.right_interest}>
              {/* <span>
                <FiChevronDown />
              </span> */}
              <span style={{ marginLeft: "5px" }}>Backend</span>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowBackendLanguages(!showBackendLanguages)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showBackendLanguages ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(163,190,140)" }}>
                    <BsFolderFill />
                  </span>
                  <span> Languages</span>
                </div>
                <AnimatePresence>
                  {showBackendLanguages && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Python
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Solidity
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> JavaScript / Node.js / TypeScript
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Golang
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Java
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Scala
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> C#
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Processing / p5.js
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={style.skill}>
                <div
                  onClick={() => setShowBackendLib(!showBackendLib)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showBackendLib ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(263,190,140)" }}>
                    <BsFolderFill />
                  </span>
                  <span> Libraries</span>
                </div>
                <AnimatePresence>
                  {showBackendLib && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Ethers.js
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Web3.js
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Truffle
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Hardhat
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Express.js
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Flask
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Django
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> FastAPI
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> OpenAPI / SwaggerUI
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> OpenAI / LLMs
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Stable Diffusion
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> pandas
                      </span>
                      <br></br>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> NumPy / SciPy
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> scikit-learn
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> TensorFlow / Keras
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> NLTK
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> spaCey
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> CoreNLP
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> OpenCV
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Selenium
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Puppeteer
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> BeautifulSoup4
                      </span>
                      <br></br>
                      
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={style.skill}>
                <div
                  onClick={() => setShowDatabases(!showDatabases)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showDatabases ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "whitesmoke" }}>
                    <BsFolderFill />
                  </span>
                  <span> Databases</span>
                </div>
                <AnimatePresence>
                  {showDatabases && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> MySQL
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> PostgreSQL
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> SQLite
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> SQLAlchemy
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> MongoDB
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Mongoose
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Cassandra
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Elasticsearch
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Hadoop
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.right_interest}>
              {/* <span>
                <FiChevronDown />
              </span> */}
              <span style={{ marginLeft: "5px" }}>Unity / Unity3D</span>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowUnityGames(!showUnityGames)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showUnityGames ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(31,197,160)" }}>
                    <BsFolderFill />
                  </span>
                  <span> 2D & 3D Games / Apps </span>
                </div>
                <AnimatePresence>
                  {showUnityGames && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> 2D / 3D game development
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Cross-platform app development
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Responsive UI (menus, screens, in-game overlays)
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowUnityARVR(!showUnityARVR)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showUnityARVR ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(131,97,60)" }}>
                    <BsFolderFill />
                  </span>
                  <span> AR / VR </span>
                </div>
                <AnimatePresence>
                  {showUnityARVR && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> 360° / immersive apps and games (virtual reality) development
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> 360° filming and editing / stitching
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Mixed reality apps and games (augmented reality) development 
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Google Cardboard deployment
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Samsung Gear VR deployment
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Oculus Rift deployment
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> MagicLeap deployment
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Hololens deployment
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.right_interest}>
              {/* <span>
                <FiChevronDown />
              </span> */}
              <span style={{ marginLeft: "5px" }}>DevOps / Cloud</span>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowDevOpsCloudPlatforms(!showDevOpsCloudPlatforms)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showDevOpsCloudPlatforms ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(81,97,160)" }}>
                    <BsFolderFill />
                  </span>
                  <span> Platforms </span>
                </div>
                <AnimatePresence>
                  {showDevOpsCloudPlatforms && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> AWS (Amazon Web Services)
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> EC2, ElasticBeanstalk, Amplify, Redshift
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> GitHub / GitLab
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Cloudflare
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={style.skill}>
                <div
                  onClick={() => setShowDevOpsCloudTools(!showDevOpsCloudTools)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showDevOpsCloudTools ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(161,27,20)" }}>
                    <BsFolderFill />
                  </span>
                  <span> Tools </span>
                </div>
                <AnimatePresence>
                  {showDevOpsCloudTools && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Git
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Docker / Docker-Compose
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Kubernetes
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Jenkins
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Sentry
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.right_interest}>
              {/* <span>
                <FiChevronDown />
              </span> */}
              <span style={{ marginLeft: "5px" }}>Hardware</span>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowHardwareGeneral(!showHardwareGeneral)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showHardwareGeneral ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(75,37,60)" }}>
                    <BsFolderFill />
                  </span>
                  <span> General </span>
                </div>
                <AnimatePresence>
                  {showHardwareGeneral && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Arduino
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Raspberry Pi
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Sensors (light, IR, ultrasonic, sound)
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Soldering
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Circuitry
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowHardware3DModel(!showHardware3DModel)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showHardware3DModel ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(31,127,60)" }}>
                    <BsFolderFill />
                  </span>
                  <span> Product Design / 3D Modeling </span>
                </div>
                <AnimatePresence>
                  {showHardware3DModel && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> SketchUp
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={style.right_interest}>
              {/* <span>
                <FiChevronDown />
              </span> */}
              <span style={{ marginLeft: "5px" }}>Art / Design</span>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowArtDesignGeneral(!showArtDesignGeneral)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showArtDesignGeneral ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(195,237,220)" }}>
                    <BsFolderFill />
                  </span>
                  <span> General </span>
                </div>
                <AnimatePresence>
                  {showArtDesignGeneral && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Photography (analog and digital)
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Darkroom photography development
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Videography / film editing
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Animation / video effects
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Wireframing / mockups
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> UX development and research
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowArtDesignTools(!showArtDesignTools)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showArtDesignTools ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(162,42,260)" }}>
                    <BsFolderFill />
                  </span>
                  <span> Tools </span>
                </div>
                <AnimatePresence>
                  {showArtDesignTools && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Figma
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Adobe Creative Suite
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Photoshop
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Illustrator
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> InDesign
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Premiere
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> After Effects
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={style.right_interest}>
              {/* <span>
                <FiChevronDown />
              </span> */}
              <span style={{ marginLeft: "5px" }}>Audio</span>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowAudioGeneral(!showAudioGeneral)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showAudioGeneral ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(175,137,220)" }}>
                    <BsFolderFill />
                  </span>
                  <span> General </span>
                </div>
                <AnimatePresence>
                  {showAudioGeneral && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Music production
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Composition
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Piano
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Singing
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Mixing & Mastering
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Sampling
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> DJing
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={style.skill}>
                <div
                  onClick={() => setShowAudioTools(!showAudioTools)}
                  className={style.dropdownSkill}
                >
                  <span>
                    {showAudioTools ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                  <span style={{ color: "rgb(22,82,160)" }}>
                    <BsFolderFill />
                  </span>
                  <span> Tools </span>
                </div>
                <AnimatePresence>
                  {showAudioTools && (
                    <motion.div
                      className={style.showSkill}
                      initial="hidden"
                      animate="visible"
                      exit="go"
                      variants={{
                        hidden: {
                          y: "-20px",
                          opacity: 0,
                        },
                        visible: {
                          y: "0",
                          opacity: 1,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.5,
                          },
                        },
                        go: {
                          y: "-20px",
                          opacity: 0,
                          transition: {
                            type: "spring",
                            delay: 0.2,
                            duration: 0.3,
                          },
                        },
                      }}
                    >
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> FL Studio
                      </span>
                      <br></br>
                      <span style={{display: 'inline'}}>
                        <BsArrowRightSquareFill style={{display: 'inline', marginRight: '5px'}}/> Audacity
                      </span>
                      <br></br>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
            
          </div>
        </motion.div>
      )}
    </div>
    </>
  );
};

export default About;
