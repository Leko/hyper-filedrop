const { remote } = require("electron")

exports.mapTermsDispatch = (dispatch, map) => ({
  ...map,
  onDropFile(_, uid, file) {
    map.onData(uid, file.path)
  }
})

const passProps = (uid, parentProps, props) => ({
  ...props,
  onDropFile: (...args) => parentProps.onDropFile(uid, ...args)
})
exports.getTermGroupProps = passProps
exports.getTermProps = passProps

exports.decorateTerm = (Term, { React }) =>
  class extends React.Component {
    preventDefault = e => {
      e.preventDefault()
    }

    handleDrop = e => {
      remote.getCurrentWindow().focus()
      this.props.onDropFile(e.dataTransfer.files[0])
    }

    render() {
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
