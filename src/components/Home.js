import React, { useEffect, useState } from 'react'
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

  useEffect(()=> {
    const getQuests = async () => {
      const data = await getDocs(questsCollectionRef)
      setQuestLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getQuests();
    
  },[])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <div>
                <Button onClick={handleOpen}>Edit</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </div>
          );
        })} 
      </div>
  );
}

export default Home;