import React, { useEffect, useState } from 'react'
import {getDocs, collection} from 'firebase/firestore';
import {db} from '../firebase';
function Home() {
  const [questLists, setQuestLists] = useState([]);
  const questsCollectionRef = collection(db, "quests")
  useEffect(()=> {
    const getQuests = async () => {
      const data = await getDocs(questsCollectionRef)
      setQuestLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getQuests();
  },[])
  return (

    <div className="homepage">
      {questLists.map((quest) => {
      return <div className="quest"> {quest.questTitle}</div>
    })}
    </div>
  );
}

export default Home