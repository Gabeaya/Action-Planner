import React, { useEffect, useState } from 'react'
import { Modal } from '@material-ui/core';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase';

function Home({isAuth}) {
  const [open, setOpen] = useState(false);
  
  const [questLists, setQuestLists] = useState([]);
  const questsCollectionRef = collection(db, "quests");
  
  const display = async() => {
    const data = await getDocs(questsCollectionRef)
    setQuestLists(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    display();
  }

  const deleteQuest = async (id) => {
    const questDoc = doc(db, "quests", id)
    await deleteDoc(questDoc)
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(()=> {
    const getQuests = async () => {
      const data = await getDocs(questsCollectionRef)
      setQuestLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getQuests();
  },[])

    

  return (
    <>
      <Modal
        open={open}
        onClose={e => setOpen(false)}
      >
        <div>
          <h1>I am a modal</h1>
          <button onClick={e => setOpen(false)}></button>
        </div>
      </Modal>
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
                <button onClick={e => setOpen(true)}>edit</button>
              </div>
              
            </div>
          );
        })} 
      </div>
    </>
    
  );
}

export default Home;