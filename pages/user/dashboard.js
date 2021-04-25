import React, { useEffect, useState } from "react";
import 'firebase/auth';
// components
import NavBar from 'components/Navbars/IndexNavbar';
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
// layout for page
import { useAuth } from '../../services/auth';
// Firebase Admin and cookies
import { firebaseAdmin } from '../../services/firebaseAdmin';
import { firebaseClient } from "../../services/firebaseClient";

import nookies from 'nookies';


const Dashboard = ({ tokenEmail }) => {

  const [data, setData] = useState({ text: '' });
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setEmail] = useState(tokenEmail);
  const [currentTokens, setTokens] = useState();
  const [lowTokenWarning, setLowTokenWarning] = useState(false);

  useEffect(() => {
    // Async func to fetch the data from out AI-API.
    const fetchData = async () => {
      // If search param exists, get/set data.
      if (search) {
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

      // Fuckin aye, low token warning?! LES GO!
      userMongoDB.tokens < 1500 ? setLowTokenWarning(true) : setLowTokenWarning(false);

      setTokens(userMongoDB.tokens)
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
      {/* <HeaderStats /> */}
      <NavBar />
      <div className="mt-18">
        <Sidebar fixed tokens={currentTokens} />
        <div className="md:pt-32 sm:pt-96 relative flex flex-col  items-center justify-center m-auto md:ml-64 bg-gray-300 ">
          <div className="relative px-4 py-3 flex flex-col md:flex-row break-words bg-white w-full h-auto mb-6 shadow-lg rounded">

            {/* INPUTS */}
            <div className="flex flex-col w-full md:w-1/2 items-center align-center ">
              <div className="flex flex-col  w-full px-4 h-full">
                <h1 className="uppercase text-xl text-black-500 mb-1 font-bold">Skills and Job Title</h1>
                <hr />
                <h2 className="text-gray-500 text-m font-semibold">
                  What's the Job Title?
              </h2>
                <input className="bg-gray-300 h-10" name="job-title" id="job-title" type='text'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)} placeholder="Assitant Regional Manager" />

                <h2 className="text-gray-500 text-m font-semibold">
                  Technical Skills:
              </h2>
                <input className="bg-gray-200 h-20" name="hard-skills" id="hard-skills" type="textarea"></input>
                <h2 className="text-gray-500 text-m font-semibold">
                  Soft Skills:
              </h2>
                <input className="bg-gray-200 h-20" name="soft-skills" id="soft-skills" type="textarea"></input>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-row w-2/3 text-center items-center justify-center align-center px-3 py-3">
                {lowTokenWarning ? (
                  <button className="bg-green-500 active:bg-blue-100 text-white font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    type='button' onClick={() => { console.log('activate toast with link to buy more tokens') }}>Need More Tokens</button>
                ) : (
                  <button className="bg-green-500 active:bg-blue-100 text-white font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    type='button' onClick={() => { setSearch(query); removeTokens(); }}>Create</button>
                )}

                <button className="bg-gray-600 active:bg-blue-100 text-white font-normal px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md   font-bold text-xs ease-linear transition-all duration-150"
                  type="button"><i className="fa fa-sync"></i>     Clear</button>

                <button className="bg-red-400 active:bg-blue-100 text-white font-normal px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md   font-bold text-xs ease-linear transition-all duration-150" type="button" onClick={removeTokens}>
                  <i className="fa fa-plus"></i>  Token Tester</button>
              </div>
            </div>

            {/* OUTPUT */}
            <div className="flex flex-col px-4 py-4 h-auto w-full md:w-1/2 items-center space-between align-center">
              <h1 className="uppercase text-xl text-black-500 mb-1 font-bold">Generated Cover Letter</h1>

              <div className="output h-auto w-full bg-gray-300 rounded">
                {isLoading ? (
                  <h5>Loading...</h5>
                ) : (
                  <span className="p-4">{data.text}</span>
                )}
              </div>
              <div className="flex flex-row w-full">

                <button className="bg-blue-400 active:bg-blue-100 text-white font-normal w-1/2 px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md mx-2 my-2 font-bold text-xs ease-linear transition-all duration-150" type="button">
                  <i className="fa fa-file"></i>  Save</button>

                <button className="bg-green-400 active:bg-blue-100 text-white font-normal w-1/2 px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md mx-2 my-2 font-bold text-xs ease-linear transition-all duration-150" type="button">
                  <i className="fa fa-file"></i>   Copy</button>

                <button className="bg-yellow-500 active:bg-blue-100 text-white font-normal w-1/2 px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md mx-2 my-2 font-bold text-xs ease-linear transition-all duration-150" type="button">
                  <i className="fa fa-file"></i>   Print</button>

              </div>
            </div>


          </div>

        </div>
      </div>
      <FooterAdmin />
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

