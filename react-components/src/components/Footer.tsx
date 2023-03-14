import React, { Component } from 'react';
import githubIcon from '../assets/github_icon.svg';
import rssIcon from '../assets/rs_school.svg';

export class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <a href="https://github.com/Siaw4ik">
          <img className="githubIcon" src={githubIcon} alt="github link" />
        </a>
        <div className="footer_description">
          <p>Online Store 2023</p>
          <p>React</p>
        </div>
        <a href="https://rs.school/js/">
          <img className="rssIcon" src={rssIcon} alt="RSSchool link" />
        </a>
      </footer>
    );
  }
}
