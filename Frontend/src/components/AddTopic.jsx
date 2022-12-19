import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../styles/addTopic.css"


const AddTopic = () => {
  const params = useParams();

  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  let [blocks, setBlocks] = useState([]);
  let [dropDownVal, setDropDownVal] = useState("");
  let [emptyArr, setEmptyArr] = useState([]);

  const dropDown = [
    {
      key: "select",
      value: "null"
    },
    {
      key: "UNDERSTOOD",
      value: "UNDERSTOOD",
    },
    {
      key: "SOMEWHAT UNDERSTOOD",
      value: "SOMEWHAT UNDERSTOOD",
    },
    {
      key: "NOT CLEAR",
      value: "NOT CLEAR",
    },
    {
      key: "WHAT RUBBISH",
      value: "WHAT RUBBISH",
    },

  ];

  const navigate = useNavigate()

  function onSubmit() {
    if (content && content.includes(".")) {
      const data = content.split(".");
      setBlocks(data);

      // console.log("blocksfunnn", blocks)
    }
  }

  function getDropDownVal(val, index) {

    if (val != "null") {
      setDropDownVal(val)
      // console.log(val);

      for (let i = 0; i < blocks.length; i++) {
        
        if (i == index) {
          let obj = {
            key: "",
            value: ""
          }
          obj.key = val
          obj.value = blocks[i]
          setEmptyArr([...emptyArr,obj])
        }
      }

      // console.log("block", blocks);
      console.log(emptyArr);

    }
  }


  async function onSearch() {
    const payload = {
      userId: params.id,
      heading: heading,
      blocks: emptyArr
    }
    let result = await fetch("http://localhost:3001/addTopic", {
      method: "POST",
      "headers": {
        "content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    })
    result = await result.json();
    if (!result.error) {
      setTimeout(() => {
        navigate(`/dashboard/${result.data.userId}`);
      }, 1000)
    } else {
      alert("Something went wrong")
    }
  }



  return (
    <div className='addTopic' >
      {
        (blocks.length > 0)
          ? <div className="addTopic-container">
            {


              blocks.map((block, index) => {
                if (block != "") {
                  return (
                    <div>

                      <h5>{block}</h5>
                      <select id="" onChange={(e) => getDropDownVal(e.target.value, index)} value={block.dropDownVal}  >
                        {
                          dropDown.map(item => {
                            return (
                              <>
                                <option value={item.value} >{item.key}</option>
                              </>
                            )
                          })
                        }
                      </select>
                    </div>
                  )
                }
              })
            }
            <button onClick={onSearch} >
              <Link className='link' >Submit</Link>
            </button>
          </div>
          :
          <div className='addTopic-container'>
            <div className='addText' >
              <label htmlFor="title">Title</label>
              <input type="text" id="title" onChange={(e) => setHeading(e.target.value)} value={heading} placeholder='Write here...' />
            </div>

            <div className='addText' >
              <label htmlFor="content">Content</label>
              <textarea id="content" placeholder='Write here...' onChange={(e) => setContent(e.target.value)} value={content}  ></textarea>
            </div>

            <button onClick={onSubmit} >
              <Link className='link' >Submit</Link>
            </button>
          </div>

      }


    </div>
  )
}

export default AddTopic






// Instead of artificially separating technologies by putting markup and logic in separate files. React separates concerns with loosely coupled units called components that contain both. We will come back to components in a further section but if you’re not yet comfortable putting markup in JS this talk might convince you otherwise.React doesn’t require using JSX but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.