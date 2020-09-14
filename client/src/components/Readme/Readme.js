import React from 'react';
import styles from './Readme.module.css';

const readme = (props) => {
    return (
        <div>
            <div>
                <div className={styles.all}>
                    <div className={styles.title}>
                        Organic Market
                    </div>
                    <div className={styles.subtitle}>
                        סופרמרקט אורגני ובריא
                    </div>
                    <div className={styles.text}>
                        הפונקציונאליות הנוספת במערכת היא מתן שליטה רחבה יותר למנהלי האתר. הם יכולים להסתיר מידע מהמשתמשים, לבצע הנחה של 10% על מוצר מסוים ולנהל את המלאי של החנות
                    </div>
                    <div className={styles.text}>
                        זאת הפעם הראשונה שאני מפתח בreact ולכן זה היה האתגר עבורי
                    </div>
                    <div className={styles.text}>
                        עבדתי לבד על הפרויקט ולכן אני אחראי על כל תוכנו
                    </div>
                    <div className={styles.text}>
                        הניתובים השונים באתר:
                        <ul>
                            <li>"/" - דף החנות</li>
                            <li>"/manage" - דף הניהול</li>
                            <li>"/cart" - דף הרכישה</li>
                            <li>"/customer" - דף עם פרטי הלקוח</li>
                            <li>"/readme" - דף זה</li>
                        </ul>
                    </div>
                    <div className={styles.text}>
                     החנות מאובטחת על ידי ביצוע בדיקת הפרטים של כל יוזר המתשאל את המערכת ורק אם הוא משתמש חוקי באתר הוא יכול לבצע פעולות. כמו כן פעולות שמיועדות למנהלים בלבד נבדק לפני זה כי הם באמת מוגדרים להיות מנהלים.
                    </div>


                </div>
            </div>
        </div>
    )
}
export default readme;