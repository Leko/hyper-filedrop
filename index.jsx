const { remote } = require("electron")

exports.decorateTerm = (Term, { React }) =>
  class extends React.Component {
    preventDefault = e => {
      e.preventDefault()
    }

    handleDrop = e => {
      const { term } = this.props
      remote.getCurrentWindow().focus()
      term.write(e.dataTransfer.files[0].path)
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
