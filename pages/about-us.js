import React from 'react';

const AboutUsPage = () => {
  const sectionStyle = {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  return (
    <div>
      <section style={sectionStyle}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px', color: '#ff6600' }}>
          MOKSHA - NSUT's Annual Cultural Fest
        </h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px', color: '#33ccff' }}>
          MOKSHA is the annual cultural festival of Netaji Subhas University of Technology (NSUT), celebrated with great enthusiasm and zeal. It is a vibrant extravaganza that brings together students from various colleges to showcase their talents and participate in a plethora of events.
        </p>
      </section>

      <section style={{ ...sectionStyle, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '28px', margin: '10px 0', color: '#ff6699' }}>Experience MOKSHA</h2>
        <div style={{ margin: '20px 0' }}>
          <video
            style={{ height: 'auto', width: '100%', maxWidth: '600px', boxShadow: '10px -5px 50px -5px rgba(0, 0, 255, 0.2)' }}
            muted
            loop
            autoPlay
          >
            <source src={"/Video-363.mp4"} type="video/mp4" />
          </video>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ fontSize: '28px', margin: '10px 0', color: '#ff6699' }}>Highlights of MOKSHA</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px', color: '#ffff00' }}>
          MOKSHA is known for its diverse range of events that cater to different interests. From music and dance to literature and art, there is something for everyone. The festival also features performances by renowned artists, making it a memorable experience for all attendees.
        </p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <h3 style={{ fontSize: '22px', margin: '10px 0', color: '#ff3333' }}>Cultural Performances</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px', color: '#33cc99' }}>
              Experience a blend of traditional and contemporary performances including dance, music, drama, and more. Students put forth their best performances, making it a visual and auditory treat.
            </p>
          </li>
          <li>
            <h3 style={{ fontSize: '22px', margin: '10px 0', color: '#ffcc00' }}>Competitions and Contests</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px', color: '#ff99cc' }}>
              Participate in various competitions ranging from debates and quizzes to fashion shows and talent hunts. These contests bring out the competitive spirit and showcase the diverse skills of the participants.
            </p>
          </li>
          <li>
            <h3 style={{ fontSize: '22px', margin: '10px 0', color: '#6699ff' }}>Celebrity Performances</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px', color: '#ff6600' }}>
              Enjoy live performances by popular artists and bands. Past editions of MOKSHA have seen performances by renowned personalities, adding glamour and excitement to the event.
            </p>
          </li>
          <li>
            <h3 style={{ fontSize: '22px', margin: '10px 0', color: '#cc33ff' }}>Workshops and Exhibitions</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px', color: '#ffff33' }}>
              Engage in interactive workshops and exhibitions that provide a platform for learning and creativity. These sessions cover a wide range of topics, offering something new and interesting for everyone.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUsPage;
