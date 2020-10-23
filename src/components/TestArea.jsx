import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FinalResult from './FinalResult'
import meaning from '../translation.json'
import { specialCharacters } from '../appConstants'
import Swipeable from 'react-swipy'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import ModalResult from './ModalResult'

class TestArea extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      final: false,
      currentQuestion: 0,
      // totalCorrect: 0,
      // totalWrong: 0,
      showMeTheMeaning: false,
      showAnswer: false,
      result: [],
      moveLeftFunc: null,
      moveRightFunc: null
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', e => {
      const { currentQuestion } = this.state
      const { totalQuestion } = this.props
      console.log(currentQuestion, totalQuestion)
      switch (e.keyCode) {
        case 37:
          // right arrow
          if (currentQuestion < totalQuestion) {
            this.checkAnswer('m')
            this.setState({ showAnswer: true, currentAnswer: 'm' })
          }
          break
        // case 38:
        //   alert('up')
        //   break
        case 39:
          // right arrow
          if (currentQuestion < totalQuestion) {
            this.checkAnswer('f')
            this.setState({ showAnswer: true, currentAnswer: 'f' })
          }
          break
        // case 40:
        //   alert('down')
        //   break
      }
    })
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this, false)
  }
  checkAnswer = async ans => {
    const { currentQuestion, result } = this.state
    const { questionList, totalQuestion } = this.props
    const questionContent = questionList[currentQuestion]
    const newResult = [...result]
    console.log(result)
    if (currentQuestion < totalQuestion) {
      if (ans === questionContent['genre']) {
        newResult.push({
          questionNum: currentQuestion,
          result: 'Correct',
          question: questionContent,
          userAnswer: ans
        })

        this.setState({
          result: newResult
          // totalCorrect: totalCorrect + 1
          // showAnswer: true
        })
        await setTimeout(() => {
          this.moveNextQuestion()
        }, 600)
      } else {
        newResult.push({
          questionNum: currentQuestion,
          result: 'Wrong',
          question: questionContent,
          userAnswer: ans
        })

        this.setState({
          result: newResult,
          // totalWrong: totalWrong + 1,
          currentAnswer: ''
          // showAnswer: true
        })
        await setTimeout(() => {
          this.moveNextQuestion()
        }, 600)
      }
    }
  }

  moveNextQuestion = () => {
    const { currentQuestion, result } = this.state
    const { totalQuestion } = this.props
    // console.log(currentQuestion, totalQuestion, result)
    if (currentQuestion < totalQuestion - 1) {
      this.setState({
        showAnswer: false,
        currentQuestion: currentQuestion + 1,
        currentAnswer: ''
      })
    } else {
      this.setState({ showAnswer: false, final: true })
    }
  }

  render () {
    const {
      currentQuestion,
      showAnswer,
      final,
      result,
      currentAnswer
    } = this.state
    const { questionList, totalQuestion } = this.props

    if (final) {
      document.removeEventListener('keydown', this, false)
      return <FinalResult result={result} />
    }

    const actionsStyles = {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '20px'
    }
    const cards = questionList.map(item => {
      return item['nom']
    })
    // let moveLeftAction
    // let moveRightAction
    return (
      <>
        {cards.length > 0 ? (
          <div
            className='card-wrapper'
            style={{ display: showAnswer ? 'none' : 'inline-block' }}
          >
            <Swipeable
              buttons={({ left, right }) => {
                // Map Swipeable's action to variable
                // this.setState()
                return (
                  <div style={actionsStyles}>
                    <div className='row' style={{ textAlign: 'center' }}>
                      <div className='col-6'>
                        <a className='round-button' onClick={left}>
                          m
                        </a>
                      </div>
                      <div className='col-6'>
                        <a className='round-button' onClick={right}>
                          f
                        </a>
                      </div>
                    </div>
                  </div>
                )
              }}
              onSwipe={ans => {
                const userAns = ans === 'left' ? 'm' : 'f'
                this.checkAnswer(userAns)
                this.setState({ showAnswer: true, currentAnswer: userAns })
              }}
            >
              <div className='card-item'>{cards[currentQuestion]}</div>
            </Swipeable>
          </div>
        ) : (
          <div zIndex={-2}>No more cards</div>
        )}
        <ModalResult
          show={showAnswer}
          questionNum={currentQuestion + 1}
          totalQuestion={totalQuestion}
          hideModal={() => this.setState({ showAnswer: false })}
        />
      </>
    )
  }
}

TestArea.propTypes = {
  totalQuestion: PropTypes.number,
  questionList: PropTypes.array.isRequired
}

export default TestArea
