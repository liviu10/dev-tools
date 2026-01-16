import React from 'react';

type BannerType = 'error' | 'success' | 'info';

interface StatusBannerProps {
    type: BannerType;
    title?: string;
    message: string;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ type, title, message }) => {
    const config = {
        error: {
            bg: 'bg-red-100 dark:bg-red-900/50',
            text: 'text-red-800 dark:text-red-300',
            border: 'border-red-300 dark:border-red-700',
            defaultTitle: 'Error'
        },
        success: {
            bg: 'bg-green-100 dark:bg-green-900/50',
            text: 'text-green-800 dark:text-green-300',
            border: 'border-green-300 dark:border-green-700',
            defaultTitle: 'Success'
        },
        info: {
            bg: 'bg-blue-100 dark:bg-blue-900/50',
            text: 'text-blue-800 dark:text-blue-300',
            border: 'border-blue-300 dark:border-blue-700',
            defaultTitle: 'Info'
        },
    };

    const styles = config[type];

    return (
        <div className={`mt-4 p-3 rounded-lg text-sm ${styles.bg} ${styles.text} ${styles.border}`}>
            <strong className="font-bold">{title || styles.defaultTitle}:</strong> {message}
        </div>
    );
};

export default StatusBanner;