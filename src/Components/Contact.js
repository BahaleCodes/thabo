import React, { Component } from "react";
import emailjs from 'emailjs-com';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactForm: {
        name: props.name,
        email: props.email,
        subject: props.subject,
        message: props.message,
        loading: false,
      }
    }
  }

	handleName = (e) => {
		var contactForm = this.state.contactForm;
		contactForm.name = e.target.value;
		this.setState({contactForm: contactForm});
	}
	handleEmail = (e) => {
		var contactForm = this.state.contactForm;
		contactForm.email = e.target.value;
		this.setState({contactForm: contactForm});
	}
  handleSubject = (e) => {
    var contactForm = this.state.contactForm;
    contactForm.subject = e.target.value;
    this.setState({contactForm: contactForm})
  }
	handleMessage = (e) => {
		var contactForm = this.state.contactForm;
		contactForm.message = e.target.value;
		this.setState({contactForm: contactForm});
	}

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    let templeteParams = {
      from_name: this.state.contactForm.name,
      to_name: 'Ntate Thabo Mponya',
      subject: this.state.contactForm.subject,
      message_html: this.state.contactForm.message,
      from_email: this.state.contactForm.email
    };
    console.log(this.state.contactForm.subject);
    emailjs.send("service_ymndnah", "template_bwg2p3c", templeteParams, "user_iyyo8AYtN3opeCzdbnjvS")
      .then(result => {
        alert('Message sent, we will respond shortly. Thank you.', result.text);
        this.setState({loading: true});
        },
        error => {
            alert('An error was encounter, Please try again', error.text);
            this.setState({loading: false});
        }
      )
      this.resetForm();
  }
  resetForm = () => {
		this.setState({
			name: '',
			email: '',
			subject: '',
			message: '',
		})
	}

  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const zip = this.props.data.address.zip;
    const phone = this.props.data.phone;
    const message = this.props.data.contactmessage;

    return (
      <section id="contact">
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">{message}</p>
          </div>
        </div>

        <div className="row">
          <div className="eight columns">
            <form onSubmit={this.handleSubmit} id="contactForm" name="sendMessage">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    size="50"
                    placeholder="Your Full Name"
                    required
                    value={this.state.name}
                    onChange={this.handleName.bind(this)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    size="50"
                    placeholder="Your Email"
                    required
                    value={this.state.name}
                    onChange={this.handleEmail.bind(this)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="subject"
                    size="35"
                    placeholder="Subject"
                    required
                    value={this.state.subject}
                    onChange={this.handleSubject.bind(this)}
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="15"
                    placeholder="Talk to me..."
                    required
                    value={this.state.message}
                    onChange={this.handleMessage.bind(this)}
                  ></textarea>
                </div>

                <div>
                  <button className="submit" type="submit">Submit</button>
                </div>
            </form>
          </div>

          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Address and Phone</h4>
              <p className="address">
                {name}
                <br />
                {street} <br />
                {city}, {state} {zip}
                <br />
                <span>{phone}</span>
              </p>
            </div>
          </aside>
        </div>
      </section>
    );
  }
}

export default Contact;
