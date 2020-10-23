import React, { useState } from 'react'
import PropTypes from 'prop-types'

function FinalResult (props) {
  // Get result from Test page (TestArea) as an array
  const result = props.result

  //

  const [showAll, setshowAll] = useState(false)

  // Count result
  const totalCorrect = result.filter(item => item['result'] === 'Correct')
    .length
  const wrongAnswerOnly = result.filter(item => item['result'] === 'Wrong')

  const totalWrong = wrongAnswerOnly.length

  const renderList = showAll ? result : wrongAnswerOnly

  // console.log(showAll)
  return (
    <div
      className='container content-container'
      style={{ marginBottom: '100px', textOverflow: 'auto' }}
    >
      <div className='row'>
        <h5>
          Total correct answers: <span className='correct'>{totalCorrect}</span>
        </h5>
      </div>
      <div className='row'>
        <h5>
          Total wrong answers: <span className='wrong'>{totalWrong}</span>
        </h5>
      </div>
      <div className='row'>
        <a href='/'>
          <h5>Try again</h5>
        </a>
      </div>

      <hr />
      <div className='row'>
        <h5>Détail</h5>
      </div>
      <div className='row checkbox'>
        <label>
          <input
            type='checkbox'
            value={showAll}
            onChange={e => setshowAll(e.target.checked)}
          />{' '}
          Show all answers
        </label>
      </div>
      <hr />

      <div className='container'>
        {renderList.map(item => {
          const questionResult =
            item['result'] === 'Correct' ? 'correct' : 'wrong'

          return (
            <div className='row' key={item['questionNum']}>
              <div className='col-2'> {item['questionNum'] + 1}</div>
              <div className='col-5'>
                <span className={questionResult}>
                  <b>{item['question']['nom']}</b>
                </span>
              </div>
              <div className='col-5'>
                <span className={questionResult}>
                  <b>
                    {item['question']['genre'] == 'm' ? 'masculin' : 'féminin'}
                  </b>
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

FinalResult.propTypes = {
  result: PropTypes.array.isRequired
}

export default FinalResult
