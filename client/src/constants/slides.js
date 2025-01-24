const slides = [
  {
    id: 1,
    text: (
      <div className="first-slide">
        <h2>Discover the Process</h2>
        <p>Ready to embark on your journey with ClearPillar?
          Here's how we work together!</p>
      </div>
    ),
    icon: null
  },
  {
    id: 2,
    text:
      (
        <div>
          <h2>Step 1</h2>
          <p>You upload information about yourself on ClearPillar and send it for our liaison to review.</p>
        </div>
      ),
    icon: (
      <div className="icon-animation-container">
        <i className="fa-solid fa-user"></i>
        <div className="file-animation">
          <i className="fa-solid fa-file"></i>
        </div>
        <i className="fa-solid fa-laptop"></i>
      </div>
    )
  },
  {
    id: 3,
    text: (
      <div>
        <h2>Step 2</h2>
        <p>Our liaison carefully reviews your information and creates customized packages.</p>
      </div>
    ),
    icon: (
      <div className="icon-animation-container-2">
        <i className="fa-lg fa-solid fa-user-tie"></i>
        <div className="mag-animation animate">
          <i className="fa-solid fa-magnifying-glass mag-glass"></i>
        </div>
        <i className="fa-solid fa-file"></i>
      </div>
    )
  },
  {
    id: 4,
    text: (
      <div>
        <h2>Step 3</h2>
        <p>You are matched with experts working with you towards academic success.</p>
      </div>
    ),
    icon: (
      <div className="icon-animation-container-3">
        <i className="fa fa-solid fa-user"></i>
        <div className="handshake-animation animate">
          <i className="fa-sm fa-solid fa-handshake"></i>
        </div>
        <i className="fa-lg fa-solid fa-people-group"></i>
      </div>
    )
  }
];

export default slides;