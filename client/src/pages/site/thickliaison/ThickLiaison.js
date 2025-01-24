import styles from 'styles/ThickLiaison.module.css'
import pillars from 'images/thickliaisonpillars.png'

export default function ThickLiaison() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.hero}>
                    <h1><a target="_blank" rel="noopener noreferrer" href="https://www.thickliaison.org/">THICK Liaison</a></h1>
                    <h3>
                        助力美國亞裔青少年提升領導力與創業力
                    </h3>
                </div>
            </div>

            {/* Pillars Intro */}
            <div className={styles.container}>
                <p>
                    四步成長旅程：助力亞裔及其他弱勢社群青少年成長；指導升學諮詢、創新思維, 軟性技能, 領導力、創業力與社區影響力.
                </p>
                <p>
                    THICK 的 4 步旅程方向是針對亞裔及其他弱勢社群青少年的全面發展而精心設計的。
                </p>
            </div>

            <div className={styles.container}>
                <div className="row">

                    <div className="col">
                        <div className={styles.verticalcenter}>
                            <p>
                                一個以目標為導向的平台，致力於提升亞裔及其他弱勢社群青年在社會中的影響力。我們創立 T.H.I.C.K. 的使命清晰而堅定：幫助亞裔人士及其他弱勢社群從大學教育開始，通過發展無形的軟性技能，晉升到更高的社會平台。THICK 致力於培養青少年擔任重要的決策職位，鼓勵他們成為企業主，為他人創造機會，最終回饋社會。

                                透過專注於教育、領導才能和創業精神，我們預期 THICK 將成為改變的催化劑，確保下一代亞裔美國人具備領導、創新和以有意義的方式貢獻社區的能力。
                            </p>
                        </div>

                    </div>

                    <div className="col">
                        <img
                            src={pillars}
                            alt="Pillars"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100vh',
                                objectFit: 'contain',
                            }} />
                    </div>
                </div>
            </div>

            {/* Pillars */}
            <div className={styles.container}>
                <div className='container mt-5'>
                    <div className='row justify-content-between'>
                        <div className='col-md-5'>
                            <h3><a target="_blank" rel="noopener noreferrer" href="https://www.clearpillar.us/">ClearPillar</a></h3>
                            <h4>學院諮詢服務</h4>
                            <p>
                                成功的基礎： 教育往往是長期成功的起點，尤其是在高度重視證書和學術成就的社區。THICK 專注於幫助美籍華裔青年找到合適的大學並取得成功，為未來的領導角色奠定基礎。這個旅程從優異的學術成績開始，因為它能裝備個人的知識、批判性思考和建立人際網絡的機會，這些都是攀登社會和職業階梯的必要條件。
                            </p>

                            <p>
                                賦予知情選擇的能力： 許多華裔美國人家庭可能無法獲得所需的資源或指導，以了解美國大學的入學程序。ClearPillar 針對這一差距，確保學生不僅能上大學，還能進入符合其優勢和志向的院校。
                            </p>
                        </div>
                        <div className='col-md-5'>
                            <h3><a target="_blank" rel="noopener noreferrer" href="/">Ah Ha</a></h3>
                            <h4>軟性技能訓練</h4>
                            <p>
                                領導力的關鍵技能： 學業成功固然重要，但領導力需要的不僅僅是知識。溝通、情緒智商和批判性思考等軟性技能對於領導職位而言至關重要。Thick多維度培養學生的語言表達能力、團隊領導力、決策力和批判性思維等。
                            </p>
                            <p>
                                文化橋樑： 對於華裔青少年而言，軟技能培訓尤其重要，因為它有助於消除文化差異，降低這些差異可能會阻礙個人和職業成長。發展這些技能可以讓個人更有效地在不同的社會和文化環境中遊刃有餘。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className='container mt-5 mb-5'>
                    <div className='row justify-content-between'>
                        <div className='col-md-5'>
                            <h3><a target="_blank" rel="noopener noreferrer" href="/">LuluMind</a></h3>
                            <h4>創業</h4>
                            <p>
                                促進經濟獨立： LuluMind 賦予年輕人支持小型亞裔企業的能力，通過協助提升這些企業的競爭力，青年們獲得寶貴的實際經驗，並學會如何成為企業主經營自己的生意。LuluMind 還通過資金支持青年創業，換取他們的時間投入，同時我們的組織也會成為公司的一部分。
                            </p>
                            <p>
                                創造領袖：LuluMind 鼓勵創新，並通過傳授領導力，解決問題的關鍵課程和實戰經驗來培養未來的創業者進而影響行業和社區的發展。
                            </p>
                        </div>

                        <div className='col-md-5'>
                            <h3><a target="_blank" rel="noopener noreferrer" href="https://www.jaxconnect.org/">JaxConnect</a></h3>
                            <h4>社區影響力</h4>
                            <p>
                                培養慈善精神：回饋是領導力和成功的重要組成部分。透過灌輸對社區的責任感，THICK 確保參與者瞭解為他人福祉做出貢獻的重要性。在旅程的最後階段，鼓勵青少年重新投資於社區，創造支持與成長的循環。
                            </p>
                            <p>
                                持續影響：鼓勵成功人士回饋社區，共同營造THICK持續性的良性循環。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}