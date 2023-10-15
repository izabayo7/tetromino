import React, {FC, useCallback} from 'react';
import {FaCheck, FaTimes} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../store/app-store';
import {AppActions} from '../../../store/app/app-actions';
import {AppSelectors} from '../../../store/app/app-selectors';
import {UiButton} from '../../particles/ui/UiButton';
import {GameControls} from '../game/GameControls';

export const OptionsGame: FC = () => {
    const ghostPiece = useSelector(AppSelectors.ghostPiece);
    const hand = useSelector(AppSelectors.hand);
    const Swipe = useSelector(AppSelectors.Swipe);
    const dispatch = useAppDispatch();

    // Define callback functions for left-hand and right-hand button clicks
    const toggleHand = useCallback(() => {
        dispatch(AppActions.hand(hand === 'left' ? 'right' : 'left'));
    }, [hand, dispatch]);
    const toggleSwipe = useCallback(() => {
        dispatch(AppActions.Swipe(Swipe === 'on' ? 'off' : 'on'));
    }, [Swipe, dispatch]);

    return (
        <>
            <div>Ghost Piece</div>
            <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={ghostPiece}
                onClick={() => dispatch(AppActions.ghostPiece())}
            >
                {ghostPiece ? <FaCheck /> : <FaTimes />}
            </UiButton>
            <div>Left Hand</div>
            {/* <GameControls Click={toggleHand} // Pass the left-hand click callback
            /> */}
            <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={hand === 'left'}
                onClick={toggleHand}
            >
                {hand === 'left' ? <FaCheck /> : <FaTimes />}
            </UiButton>
            <div>Right Hand</div>
            {/* <GameControls
                onRightHandClick={handleRightHandClick} // Pass the right-hand click callback
            /> */}
            <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={hand === 'right'}
                onClick={toggleHand}
            >
                {hand === 'right' ? <FaCheck /> : <FaTimes />}
            </UiButton>
            <div>Swipe</div>
            <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={Swipe === 'on'}
                onClick={toggleSwipe}
            >
                {Swipe === 'on' ? <FaCheck /> : <FaTimes />}
            </UiButton>
            <div>D-Pad</div>
            <UiButton
                className="flex rounded-full text-[12px] p-2 justify-center"
                active={Swipe === 'off'}
                onClick={toggleSwipe}
            >
                {Swipe === 'off' ? <FaCheck /> : <FaTimes />}
            </UiButton>
        </>
    );
};
