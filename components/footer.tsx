import React from "react"

export default function Footer() {
  return (
    <>
      <footer className="page-footer orange">
        <div className="container">
          <div className="row">
            <div className="col l9 s12">
              <h5 className="white-text">About the project</h5>
              <p className="grey-text text-lighten-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatum laborum aliquid! Saepe dolore nostrum ullam explicabo consequuntur, deserunt ipsum. Temporibus id quas natus recusandae praesentium et est voluptatum blanditiis?
              </p>
            </div>
            <div className="col l3 s12">
              <h5 className="white-text">Team members</h5>
              <ul>
                <li><a className="white-text" href="#!">Link 1</a></li>
                <li><a className="white-text" href="#!">Link 2</a></li>
                <li><a className="white-text" href="#!">Link 3</a></li>
                <li><a className="white-text" href="#!">Link 4</a></li>
                <li><a className="white-text" href="#!">Link 5</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}