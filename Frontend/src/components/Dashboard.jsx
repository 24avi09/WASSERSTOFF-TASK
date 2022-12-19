import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import "../styles/dashboard.css"




const Dashboard = () => {

    const navigate = useNavigate();

    const params = useParams();
    let [topics, setTopics] = useState([]);


    async function getTopics() {
        let fetchingTopics = await fetch(`http://localhost:3001/dashboard/${params.id}`, {
            method: "get"
        });
        fetchingTopics = await fetchingTopics.json();
        setTopics(fetchingTopics.data)
    }
    function onSearch() {
        navigate(`/addTopic/${params.id}`);
    }

    useEffect(() => {
        getTopics();
    }, []);

    return (
        <div className='dashboard'>
            <div className="dashboard-container">
                <div className='topic-button' >
                    <div>
                        <h2>Topic List</h2>
                    </div>
                    <div>
                        <button onClick={onSearch} >
                            <Link  >Add Topic</Link>
                        </button>

                    </div>

                </div>
                <div>
                    <div className='topicList' >
                        {
                            topics.map((topic, index) => {
                                return (
                                    <div key={index} className="head" >
                                        <h4>{topic.heading}</h4>
                                        <h4>{topic.percentage}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard