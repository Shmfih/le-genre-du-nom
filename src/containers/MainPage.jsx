import React, { PureComponent } from 'react'
import {
  generateRandomNumberArray,
  getRandomInt,
  getQuestion
} from '../functions'
import { maxWordNumber, pronomList, questionNumList } from '../appConstants'
import TestArea from '../components/TestArea'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

class MainPage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      start: false,
      final: false,
      maxWordPreq: maxWordNumber,
      maxWords: 20,
      freqRange: {
        min: 1,
        max: 20
      },
      questionList: [],
      loading: true
    }
  }

  componentDidMount () {
    // try {
    //   const localTempsList = JSON.parse(localStorage.getItem('tempsList'))
    //   if (localTempsList) this.setState({ tempsList: localTempsList })
    // } catch {
    //   localStorage.clear()
    //   this.setState({ tempsList: sampleTempsList })
    // }
    this.generateQuestions()
  }

  generateQuestions = async () => {
    const { maxWords, freqRange } = this.state
    const { min, max } = freqRange
    const promiseList = []

    // Generate a random array of question number
    const minRange = Math.ceil((min * maxWordNumber) / 100)
    const maxRange = Math.ceil((max * maxWordNumber) / 100)

    const randArray = generateRandomNumberArray(maxWords, minRange, maxRange)
    // console.log(minRange, maxRange, randArray)

    randArray.forEach(async item => {
      // Get question contents
      promiseList.push(getQuestion(item))
    })

    // Fetch answer from database
    const questionList = await Promise.all(promiseList)

    this.setState({ questionList, loading: false })

    return questionList
  }

  startTest = async () => {
    await this.generateQuestions()
    this.setState({ start: true })
  }

  changeTempsStatus = (temps, status) => {
    const { tempsList } = this.state
    const newTempsList = { ...tempsList }
    newTempsList[temps] = status
    // Save "temps" option for next time
    localStorage.setItem('tempsList', JSON.stringify(newTempsList))

    this.setState({ tempsList: newTempsList })
  }

  render () {
    const { start, maxWords, questionList, loading, freqRange } = this.state
    if (!(questionList.length > 0)) return <div>Loading...</div>

    return (
      <div className='container content-container'>
        {!start && (
          <>
            <div className='form-group row'>
              <label
                htmlFor='maxWords'
                className='col-sm-4 col-form-label'
                style={{ paddingLeft: '30px', textAlign: 'left' }}
              >
                Number of words:
              </label>
              <div className='col-sm-4'>
                <select
                  name='maxWords'
                  id='maxWords'
                  className='max-question-select'
                  onChange={e => this.setState({ maxWords: e.target.value })}
                  value={maxWords}
                >
                  {questionNumList.map(item => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className='col-sm-4'>
                <button
                  className='btn btn-info main-start-button'
                  onClick={() => {
                    this.setState({ loading: true })
                    this.startTest()
                  }}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Start'}
                </button>
              </div>
            </div>
            <div className='form-group row'>
              <div className='container'>
                <div className='row' style={{ margin: '15px' }}>
                  Words's popularity:
                </div>

                <div className='row' style={{ width: '90%', margin: '15px' }}>
                  <InputRange
                    minValue={1}
                    maxValue={100}
                    value={freqRange}
                    onChange={value => this.setState({ freqRange: value })}
                    // onChangeComplete={value => console.log(value)}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {start && !loading && (
          <TestArea
            totalQuestion={Number(maxWords)}
            questionList={questionList}
          />
        )}
      </div>
    )
  }
}

MainPage.propTypes = {}

export default MainPage
