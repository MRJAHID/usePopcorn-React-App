import {useEffect} from 'react';

export const useKey = (Key, action) => {
    useEffect(function () {
        function escapeMovieCallback(e) {
            if (e.code.toLowerCase() === Key.toLowerCase()) action();
        }

        document.addEventListener('keydown', escapeMovieCallback);

        // Event Listener Clean Up Function
        return function () {
            document.removeEventListener('keydown', escapeMovieCallback);
        }
    }, [action, Key]);
};

