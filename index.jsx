const { remote } = require("electron")

exports.middleware = store => next => action => {
  console.log(action)
  return next(action)
}

exports.mapTermsDispatch = (dispatch, map) => ({
  ...map,
  onDropFile(file) {
    // dispatch
    // term.write(file.path)
  }
})

exports.decorateTerm = (Term, { React }) =>
  class extends React.Component {
    preventDefault = e => {
      e.preventDefault()
    }

    handleDrop = e => {
      const { term } = this.props
      remote.getCurrentWindow().focus()
      this.props.onDropFile(e.dataTransfer.files[0])
    }

    render() {
      console.log(this.props.onDropFile)
      return (
        <div
          style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
          onDragOver={this.preventDefault}
          onDrop={this.handleDrop}
        >
          <Term {...this.props} />
        </div>
      )
    }
  }
