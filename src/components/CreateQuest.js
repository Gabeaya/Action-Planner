import React from 'react'

function CreateQuest({missionValues, setMissionValues}) {
  const handleChange = (i, e) => {
    const newMissionValues = [...missionValues];
    newMissionValues[i][e.target.mission] = e.target.value;
    setMissionValues(newMissionValues);
  }

const addFormFields = () => {
  setMissionValues([...missionValues, {mission: ""}])
}

const removeFormFields = (i) => {
  const newMissionValues = [...missionValues];
  newMissionValues.splice(i, 1);
  setMissionValues(newMissionValues)
}

const handleSubmit = (event) => {
  event.preventDefault();
  alert(JSON.stringify(missionValues));
}
  return (
    <form onSubmit={handleSubmit}>
      <div className='createPostPage'>
        <div className='cpContainer'>
          <h1> Cast a new quest </h1>
          <div className='inputGp'> 
            <label> Quest Name:</label>
            <input placeholder='Title...'/>
          </div>
          <div className="inputGp">
            <label> Quest Description: </label>
            <textarea placeholder='Description...'/>
          </div>
          <div className='inputGp'>
            {missionValues.map((element, index) => (
              <div className='form-inline' key={index}>
                <label>Mission</label>
                <input type='text' name='form' value={element.mission || ""} onChange={e => handleChange(index, e)} />
                {
                  index ?
                  <button type='button' className='button remove' onClick={() => removeFormFields(index)}>Remove</button>
                  : null 
                }
              </div>
            ))}
            <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
          </div>
        </div>
      </div>
    </form>
    
  )
}

export default CreateQuest