import classNames from 'classnames';
import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {GameActions} from '../../../store/game/game-actions';
import {GamePlayerDirection} from '../../../engine/game-transform';
import {GameSelectors} from '../../../store/game/game-selectors';
import {GameTicker} from '../../atoms/game/GameTicker';
import {GameTimer} from '../../atoms/game/GameTimer';
import {GameGrid} from '../../molecules/game/GameGrid';
import {GameMusic} from '../../molecules/game/GameMusic';
import {GamePreloader} from '../../molecules/game/GamePreloader';
import {GameSoundTracks} from '../../molecules/game/GameSoundTracks';
import {GameToast} from '../../molecules/game/GameToast';
import {useUiTheme} from '../../particles/contexts/UiThemeContext';
import {useDocVisible} from '../../particles/hooks/useDocVisible';
import {ClassNameProps} from '../../particles/particles.types';
import {AppSelectors} from '../../../store/app/app-selectors';

export const GameEngine: FC<ClassNameProps> = ({className}) => {
    // const [swipeEnabled, setSwipeEnabled] = useState(false);
    const Swipe = useSelector(AppSelectors.Swipe);
    const gridColsMobiles = Array.from(
        document.querySelectorAll('.grid-cols-mobile')
    );
    useEffect(() => {
        // if (Swipe === undefined) return;
        // if (!document || !swipeEnabled) return;
        if (Swipe === 'on') {
            //console.log('Hello');
            const swipeArea = document.getElementsByClassName('swipe');
            // console.log(swipeArea);
            let touchStartX: number, touchStartY: number;

            document.addEventListener('touchstart', (e) => {
                e.preventDefault();
                touchStartX = e.touches[0].pageX;
                touchStartY = e.touches[0].pageY;
                console.log('Touches', e.touches.length);
                console.log('Target', e.targetTouches.length);
                console.log('Changed', e.changedTouches.length);
            });

            document.addEventListener('touchstart', (e) => {
                [...e.changedTouches].forEach((touch) => {
                    // console.log(`${touch.pageY}px`);
                    // console.log(`${touch.pageX}px`);
                    // console.log('Start');
                });
            });

            document.addEventListener('touchmove', (e) => {
                [...e.changedTouches].forEach((touch) => {
                    // console.log('Start');
                });
            });
            document.addEventListener('touchend', (e) => {
                [...e.changedTouches].forEach((touch) => {
                    const delay = 500;
                    const touchEndX = touch.pageX;
                    const touchEndY = touch.pageY;
                    const deltaX = touchEndX - touchStartX;
                    const deltaY = touchEndY - touchStartY;
                    // Determine the direction based on deltaX and deltaY
                    let direction;
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        direction = deltaX > 0 ? 'right' : 'left';
                    } else {
                        direction = deltaY > 0 ? 'down' : 'up';
                    }
                    console.log(`Swipe direction: ${direction}`);
                    if (direction === 'left') {
                        dispatch(GameActions.move(GamePlayerDirection.LEFT));
                    }
                    if (direction === 'right') {
                        dispatch(GameActions.move(GamePlayerDirection.RIGHT));
                    }
                    if (direction === 'up') {
                        dispatch(GameActions.rotate(GamePlayerDirection.RIGHT));
                    }
                    if (direction === 'down') {
                        // dispatch(GameActions.softDrop(true));
                        // dispatch(GameActions.hardDrop());
                        dispatch(GameActions.rotate(GamePlayerDirection.LEFT));
                    }
                    //dispatch(GameActions.softDrop(false));
                });
            });
        }
    });
    const [loaded, setLoaded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useAppDispatch();
    const visible = useDocVisible();

    const starting = useSelector(GameSelectors.starting);
    const running = useSelector(GameSelectors.running);
    const finishing = useSelector(GameSelectors.finishing);
    const restartTicker = useSelector(GameSelectors.restartTicker);
    const toast = useSelector(GameSelectors.toastMessage);
    const speed = useSelector(GameSelectors.speed);

    useEffect(() => {
        if (toast) {
            setShowToast(true);
            const id = setTimeout(() => {
                setShowToast(false);
            }, 1000);
            return () => {
                setShowToast(false);
                clearTimeout(id);
            };
        }
    }, [toast]);

    useEffect(() => {
        if (!visible) {
            dispatch(GameActions.pause());
        }
    }, [visible, dispatch]);

    const {transparent} = useUiTheme();

    return (
        <div
            className={classNames(
                className,
                document,
                Swipe === 'on' && !document
            )}
        >
            <div
                className={classNames(
                    className,
                    'flex relative overflow-hidden rounded-lg desktop:p-4 w-full',
                    {
                        'border border-gray-200 dark:border-gray-600':
                            transparent,
                        'dark:nm-inset-gray-800 nm-inset-gray-100': !transparent
                    }
                )}
                // onTouchStart={() => {
                //     alert('Touch Start');
                // }}
                // onTouchMove={() => {
                //     alert('touch move');
                // }}
                // onTouchMoveCapture={() => {
                //     if (true) {
                //         alert('Swipped left');
                //     }
                //     if (false) {
                //         alert('Swiped right');
                //     }
                // }}
            >
                <GameGrid />
                {running && <GameMusic />}
                <GameSoundTracks />
                {starting && !loaded && (
                    <GamePreloader
                        className="absolute w-full h-full -m-4"
                        onLoaded={() => setLoaded(true)}
                    />
                )}
                {starting && loaded && (
                    <GameTimer
                        className="absolute w-full h-full -m-4"
                        onStart={() => dispatch(GameActions.run())}
                    />
                )}
                {showToast && (
                    <GameToast
                        className="absolute w-full h-full -m-4"
                        message={toast!}
                    />
                )}
                {running &&
                    [restartTicker].map((key) => (
                        <GameTicker
                            speed={speed}
                            key={key}
                            onTick={() => dispatch(GameActions.tick())}
                        />
                    ))}
                {finishing && (
                    <GameTicker
                        speed={50}
                        onTick={() => dispatch(GameActions.finishing())}
                    />
                )}
            </div>
        </div>
    );
};
