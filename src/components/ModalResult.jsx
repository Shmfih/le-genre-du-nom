import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Wrong from '../svg/wrong.svg'
import Correct from '../svg/correct.svg'

class ModalResult extends PureComponent {
  render () {
    const { show, questionNum, totalQuestion, hideModal } = this.props
    // console.log(isCorrect)
    return (
      <div
        id='myModal'
        class='modal'
        style={{ display: show ? 'block' : 'none' }}
        onClick={() => hideModal()}
      >
        <div class='modal-content'>
          <h2>{questionNum < totalQuestion ? questionNum : 'Finish'}</h2>
          {/* {isCorrect ? <img src={Correct} /> : <img src={Wrong} />} */}
        </div>
      </div>
    )
  }
}

ModalResult.propTypes = {}

export default ModalResult
