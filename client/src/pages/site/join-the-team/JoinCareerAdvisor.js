import { Link } from 'react-router-dom';
import careerAdvisorImage from 'images/gradstudent.jpeg';
import styles from 'styles/JoinTheTeam.module.css'

export default function JoinCareerAdvisor() {
    return (
        <div className={styles.page}>
            <div className={styles.section}>
                <div className={styles.content}>
                    <h2>Career Advisor Program</h2>

                    <div className={styles.info}>
                        <div className={styles.text}>
                            <h3>Empowering the Next Generation</h3>
                            <p>Many young professionals have excelled academically but face unique challenges navigating the professional world. Our Career Advisor program seeks to bridge this gap by inviting successful professionals to mentor and guide the next generation.</p>
                        </div>
                        <div className={styles.image}>
                            <img src={careerAdvisorImage} alt="Career Advisor" />
                        </div>
                    </div>

                    <h3>How It Works</h3>
                    <ol>
                        <li><strong>Invite Accomplished Professionals:</strong> We invite successful professionals, such as managers from top companies, to share their experiences and wisdom. These career advisors offer a helping hand to the next generation, providing invaluable insights into various industries and career paths.</li>
                        <li><strong>Beyond Good Grades:</strong> The focus isn't just on academic achievement or getting into good schools, but also on practical career advancement. Many young people find themselves in good jobs but without a strong voice or a clear path forward in the workplace. Our program helps participants overcome these challenges.</li>
                        <li><strong>Alliance of Accomplished Professionals:</strong> Forming an alliance of accomplished professionals, we gather successful individuals willing to volunteer their time to guide the next generation. This network ensures that mentees receive tailored advice from people who understand the challenges and opportunities in the professional world.</li>
                    </ol>

                    <h3>What You’ll Do:</h3>
                    <ul>
                        <li>
                            <strong>Mentor Aspiring Professionals:</strong> Offer one or two consultation sessions to help mentees define their career goals, overcome professional challenges, and gain insights into specific industries.
                        </li>
                        <li>
                            <strong>Share Insider Knowledge:</strong> Provide valuable industry insights, job-specific advice, and career-building strategies to help young professionals excel in their chosen fields.
                        </li>
                        <li>
                            <strong>Focus on Workplace Empowerment:</strong> Many young professionals struggle to find their voice in the workplace. Your mentorship will help them become more confident and assertive leaders.
                        </li>
                    </ul>

                    <h4>Start Volunteering Today!</h4>

                    <p>If you’re interested in giving back, fill out the form below to become a volunteer career advisor. Your experience and insights could change the trajectory of someone’s career.</p>

                </div>
            </div>
        </div>
    );
}
