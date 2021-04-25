import React, { useEffect, useState } from "react";
import 'firebase/auth';
// components
import NavBar from 'components/Navbars/IndexNavbar';
import StatusBar from 'components/Statusbar/Statusbar';
import Footer from "components/Footers/Footer";

// Firebase Admin and cookies
import { firebaseAdmin } from '../services/firebaseAdmin';
import nookies from 'nookies';


const Dashboard = ({ tokenEmail }) => {
  const [data, setData] = useState({ text: '' });
  const [query, setQuery] = useState({
    name: '',
    location: '',
    // Step 2 Position Details
    jobTitle: '',
    hardSkills: '',
    softSkills: '',
  });

  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setEmail] = useState(tokenEmail);
  const [currentTokens, setTokens] = useState();
  const [visibleOutput, setVisibleOutput] = useState(false);
  const [progress, setStatus] = useState(1);
  useEffect(() => {
    // Async func to fetch the data from out AI-API.
    const fetchData = async () => {
      // If search param exists, get/set data.
      if (search) {
        console.log(search)
        setIsLoading(true);
        const res = await fetch(`../api/openai`, {
          body: JSON.stringify({
            job_title: search
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
        // Once the response comes back, set the data to a state and turn "loading" to false.
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    }
    // Call the fetchData func everytime the page is loaded.
    fetchData();
  }, [search]);


  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('http://localhost:3000/api/getuser', {
        body: JSON.stringify({
          email: userEmail
        }),
        headers: {
          'Contnet-Type': 'application/json'
        },
        method: 'POST'
      });
      const userdata = await res.json();
      const userMongoDB = JSON.parse(JSON.stringify(userdata));
    }
    getUser();
  }, [currentTokens])

  const removeTokens = async () => {
    const reducedTokens = currentTokens - 1;
    setTokens(reducedTokens);
    const res = await fetch(`http://localhost:3000/api/removetokens`, {
      body: JSON.stringify({
        email: userEmail,
        tokens: reducedTokens
      }),
      headers: {
        'Contnet-Type': 'application/json'
      },
      method: 'POST'
    });
  }




  return (
    <>
      <NavBar />
      <div className="relative h-auto mt-20 lg:mt-20">
        <div className=" relative flex flex-col items-center justify-center m-auto 
        h-auto pb-20
        orange-gradient">

          <StatusBar status={progress} />

          {/* IO Box */}
          <div className="px-4 py-3 flex flex-col break-words w-10/12 lg:w-8/12 mb-6 shadow-lg rounded
          bg-gray-100 ">


            {/* INPUTS */}

            {/* STEP 1*/}
            <div className={`${progress === 1 ? ('flex') : ('hidden')} flex-col items-center justify-center m-auto`}>
              <div className="flex flex-col h-full w-10/12">
                <h1 className="text-4xl text-black-500 mb-5 font-bold">Let's Make This Quick</h1>
                <hr />
                <div>
                  <h2 className="text-gray-600 mt-5 mb-5 text-lg font-semibold mb-5">
                    Starting with some basic information:
                  </h2>
                  <h2 className="text-gray-600 text-lg font-semibold mb-5">
                    Your Name
                  </h2>
                  <input className="bg-gray-300 shadow-lg rounded p-2 w-full border-2 border-orange-500 h-20 mb-5" name="name" id="name" type="textarea" placeholder="Dwight Schrute"
                    value={query.name}
                    onChange={(e) => setQuery(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  ></input>

                  <h2 className="text-gray-600 text-lg font-semibold mb-5">
                    Your Location
                  </h2>
                  <input className="bg-gray-300 shadow-lg rounded p-2 w-full border-2 border-orange-500 h-20 mb-5" name="location" id="location" type="textarea" placeholder="Scranton, PA"
                    value={query.location}
                    onChange={(e) => setQuery(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  ></input>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-row w-2/3 text-center items-center justify-center align-center px-3 py-3 mb-5">


                <button className="bg-blue-600 active:bg-blue-100 text-white font-normal px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-lg font-bold text-xs ease-linear transition-all duration-150"
                  type="button" onClick={() => { setStatus(progress + 1); }}>Next<i className="fa fa-arrow-right px-2"></i></button>

              </div>
            </div>
            {/* STEP 2*/}
            <div className={`${progress === 2 ? ('flex') : ('hidden')} flex-col items-center justify-center m-auto`}>

              <div className="flex flex-col h-full w-10/12">
                <h1 className="text-4xl text-black-500 mb-5 font-bold">Tell us more about this position</h1>
                <hr />
                <div>
                  <h2 className="text-gray-600 mt-5 mb-5 text-lg font-semibold mb-5">
                    What Job Title are you Applying for?
                  </h2>
                  <input className="bg-gray-300 shadow-lg rounded p-2 w-full h-10 mb-5 border-orange-500" name="jobTitle" id="job-title" type='text'
                    value={query.jobTitle}
                    onChange={(e) => setQuery(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} placeholder="Assitant Regional Manager"></input>

                  <h2 className="text-gray-600 text-lg font-semibold mb-5">
                    List applicable skills.
                  </h2>
                  <input className="bg-gray-300 shadow-lg rounded p-2 w-full border-2 border-orange-500 h-20 mb-5" name="hardSkills" id="hard-skills" type="textarea" placeholder="Programming, Data Analysis, User Experience"
                    value={query.hardSkills}
                    onChange={(e) => setQuery(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  ></input>

                  <h2 className="text-gray-600 text-lg font-semibold mb-5">
                    What soft skills make you valuable?
                  </h2>
                  <input className="bg-gray-300 shadow-lg rounded p-2 w-full border-2 border-orange-500 h-20 mb-5" name="softSkills" id="soft-skills" type="textarea" placeholder="Time management, Creative Thinking, Conflict Resolution"
                    value={query.softSkills}
                    onChange={(e) => setQuery(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  ></input>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-row w-2/3 text-center items-center justify-center align-center px-3 py-3 mb-5">



                <button className="bg-gray-600 active:bg-blue-100 text-white font-normal px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-lg font-bold text-xs ease-linear transition-all duration-150"
                  type="button" onClick={() => { setStatus(progress - 1); }}><i className="fa fa-arrow-left px-2"></i>Back</button>

                <button className="bg-blue-600 active:bg-blue-100 text-white font-normal px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-lg font-bold text-xs ease-linear transition-all duration-150"
                  type="button" onClick={() => { setStatus(progress + 1); }}>Next<i className="fa fa-arrow-right px-2"></i></button>
              </div>
            </div>


            {/* STEP 3 */}
            <div className={`${progress === 3 ? ('flex') : ('hidden')}  flex-col items-center justify-center m-auto`}>

              <div className="flex flex-col h-full w-10/12">
                <h1 className="text-4xl text-black-500 mb-5 font-bold text-center">We have everything to build an <u>awesome</u> Cover Letter!</h1>
                <hr />

              </div>


              {/* BUTTONS */}
              <div className="flex flex-row w-2/3 text-center items-center justify-center align-center px-3 py-3 mb-5 ">


                <button className="bg-gray-600 active:bg-blue-100 text-white font-normal px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-lg font-bold text-xs ease-linear transition-all duration-150"
                  type="button" onClick={() => { setStatus(progress - 1); }}><i className="fa fa-arrow-left px-2"></i>Back</button>

                <button className="bg-green-500 active:bg-blue-100 text-white font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-lg inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                  type='button' onClick={() => { setSearch(query); setVisibleOutput(true); }}><i className="fa fa-check px-2"></i>Create</button>



              </div>
            </div>
            {/* OUTPUT */}
            {visibleOutput && progress === 3 ? (
              <div className="flex flex-col px-4 py-4 h-auto w-full md:w-1/2 items-center space-between align-center">
                <h1 className="uppercase text-xl text-black-500 mb-1 font-bold">Generated Cover Letter</h1>

                <div className="output h-auto w-full bg-gray-300 rounded">
                  {isLoading ? (
                    <div className="h-350-px text-center">
                      <h2>Loading...</h2>
                    </div>
                  ) : (
                    <span className="p-4">{data.text}</span>
                  )}
                </div>

                <div className="flex flex-row w-full justify-center">
                  <button className="bg-blue-400 active:bg-blue-100 text-white font-normal  px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-lg mx-2 my-2 font-bold text-xs ease-linear transition-all duration-150" type="button">
                    <i className="fa fa-file"></i>  Save</button>
                  <button className="bg-green-400 active:bg-blue-100 text-white font-normal px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-lg mx-2 my-2 font-bold text-xs ease-linear transition-all duration-150" type="button">
                    <i className="fa fa-file"></i>  Copy</button>
                  <button className="bg-yellow-500 active:bg-blue-100 text-white font-normal px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-lg mx-2 my-2 font-bold text-xs ease-linear transition-all duration-150" type="button">
                    <i className="fa fa-file"></i>   Print</button>
                </div>

              </div>
            ) : (
              <></>
            )}

          </div>

        </div>
      </div>
      <Footer />
    </>
  );


}

// export default withAuth(Dashboard);
export default Dashboard;

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
  const { email } = token;
  return {
    props: {
      tokenEmail: email,
    }
  }


}

