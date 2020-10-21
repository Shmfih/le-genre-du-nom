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
      totalCorrect: 0,
      totalWrong: 0,
      showMeTheMeaning: false,
      showAnswer: false,
      result: []
    }
  }

  checkAnswer = async ans => {
    const { currentQuestion, result, totalCorrect, totalWrong } = this.state
    const { questionList } = this.props
    const questionContent = questionList[currentQuestion]
    const newResult = [...result]
    if (ans === questionContent['genre']) {
      newResult.push({
        questionNum: currentQuestion,
        result: 'Correct',
        question: questionContent,
        userAnswer: ans
      })

      this.setState({
        result: newResult,
        totalCorrect: totalCorrect + 1
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
        totalWrong: totalWrong + 1,
        currentAnswer: ''
        // showAnswer: true
      })
      await setTimeout(() => {
        this.moveNextQuestion()
      }, 600)
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

    if (final) return <FinalResult result={result} />
    const actionsStyles = {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '20px'
    }
    const cards = questionList.map(item => {
      return item['nom']
    })
    return (
      <>
        {cards.length > 0 ? (
          <div
            className='card-wrapper'
            style={{ display: showAnswer ? 'none' : 'inline-block' }}
          >
            <Swipeable
              buttons={({ left, right }) => (
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
              )}
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
          isCorrect={
            currentAnswer == questionList[currentQuestion]['genre']
              ? true
              : false
          }
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
