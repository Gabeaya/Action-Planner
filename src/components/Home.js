import React, { useEffect, useState } from 'react'
import {getDocs, collection, setDoc, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import './App.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Home({isAuth, missionValues, setMissionValues}) {
  const [open, setOpen] = useState(false);
  const [questTitle, setQuestTitle] = useState("");
  const [questLists, setQuestLists] = useState([]);
  const questsCollectionRef = collection(db, "quests");
  const [questOrigin, setQuestOrigin] = useState("");
  const [selectedDate, setSelectedDate ] = useState(null);

  //Add these functions(27-41) to the app js and pass it as a prop when all is said and done
  const addFormFields = () => {
    setMissionValues([...missionValues, {mission: ""}])
  }
  const removeFormFields = (i) => {
    const newMissionValues = [...missionValues];
    newMissionValues.splice(i, 1);
    setMissionValues(newMissionValues)
  }

  const handleChange = (e, index) => {
    const {name, value} = e.target
    const newMissionValues = [...missionValues];
    newMissionValues[index][name] = value;
    setMissionValues(newMissionValues)
  };

  const display = async() => {
    const data = await getDocs(questsCollectionRef)
    setQuestLists(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    display();
  }

  const deleteQuest = async (id) => {
    const questDoc = doc(db, "quests", id)
    await deleteDoc(questDoc)
  };

  useEffect(()=> {
    const getQuests = async () => {
      const data = await getDocs(questsCollectionRef)
      setQuestLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getQuests();
    
  },[])

  let navigate = useNavigate();

  const updateQuest = async (e) => {
    e.preventDefault();
    setOpen(false);
    await setDoc(doc(db, "quests"), {
      questTitle, 
      questOrigin, 
      selectedDate, 
      missionValues, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}
    }, { merge: true});
    navigate("/");
    
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log()
  return (
      <div className="homepage">
      
        {questLists.map((quest) => {

          return (
            
            <div className="quest"> 
              <div className="header"> 
                <div className='title'> 
                  <h1>"{quest.questTitle}"</h1>
                </div>
                <div className='questTextContainer'>
                  <h2>Whats the story: {quest.questOrigin}</h2>
                  <p>Deadline: {quest.selectedDate}</p>
                </div>

                <div className='deletePost'>
                  {isAuth && quest.author.id === auth.currentUser.uid && (
                    <button 
                      onClick={() => {
                        deleteQuest(quest.id);
                        display();
                      }}
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
              <div className='postDetails'>
                {isAuth && quest.author.id === auth.currentUser.uid && (
                  <><Button onClick={handleOpen}>Details...</Button><Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className='inputGp'> 
                          <label> Quest Name:</label>
                          <br/>
                          <input 
                            placeholder={quest.questTitle} 
                            onChange={(event) => {
                              setQuestTitle(event.target.value);
                            }}
                          />
                        </div>
                        <div className="inputGp">
                          <label> Quest Origin: </label>
                          <br />
                          <textarea 
                            placeholder={quest.questOrigin}
                            onChange={(event) => {
                              setQuestOrigin(event.target.value);
                            }}
                          />
                        </div>
                        <div className='datePicker'>
                          <label>Quest Deadline</label>
                          <br/>
                          <input
                            placeholder={quest.selectedDate}
                            disabled
                          />
                          
                        </div>
                        
                        <div className='inputGp'>
                          {missionValues.map((element, index) => (
                            <div className='form-inline' key={index}>
                              <label>Mission</label>
                              <br />
                              <input type='text' name='mission' value={element.mission} onChange={(e) => handleChange(e, index)} />
                              {
                                index ?
                                <button type='button' className='button remove' onClick={() => removeFormFields(index)}>Remove</button>
                                : null 
                              }
                            </div>
                          ))}
                          <br/>
                          <div className="button-section">
                            <button className="button add" type="button" onClick={() => addFormFields()}>Add Mission</button>
                          </div>
                        </div>
                        <Button onClick={updateQuest}>Update</Button>
                      </Typography>
                      
                    </Box>
                  </Modal></>
                )}
                
              </div>
            </div>
          );
        })} 
      </div>
  );
}

export default Home;