import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from 'styles/Privacy.module.css'

export default function Privacy() {
    const [markdownContent, setMarkdownContent] = useState('');
    const { i18n } = useTranslation();

    useEffect(() => {
        if (i18n.language === "en") {
            fetch('/EnglishPrivacyLetter.md')
                .then((res) => res.text())
                .then((data) => setMarkdownContent(data));
        } else {
            fetch('/ChinesePrivacyLetter.md')
                .then((res) => res.text())
                .then((data) => setMarkdownContent(data));
        }

    }, [i18n.language]);

    return (
        <div className={styles.container}>
            <div className={styles.letter}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdownContent}
                </ReactMarkdown>
            </div>
        </div>
    );
}
