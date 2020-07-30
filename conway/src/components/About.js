import React from 'react';
import './componentCSS/About.css';

function About() {
    return (
        <div className='aboutWrapper'>
            <h1>About</h1>
            <p>John Horton Conway FRS (26 December 1937 – 11 April 2020)
            was an English mathematician active in the theory of finite
            groups, knot theory, number theory, combinatorial game theory
            and coding theory. He also made contributions to many branches
            of recreational mathematics, most notably the invention of the
                cellular automaton called the Game of Life.</p>

            <h3>This Page Developed By: James Pico</h3>
            <a href='https://github.com/JGPico/Conways-Game-of-Life/tree/master/conway'
                target="_blank">GitHub Link</a>
        </div>
    );
}

export default About;