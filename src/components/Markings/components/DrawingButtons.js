import React from 'react'
import {
    View
} from 'react-native'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info';

import CircleIconButton from '../../common/CircleIconButton'
import NeedHelpButton from '../../classifier/NeedHelpButton'

const circleRadius = DeviceInfo.isTablet() ? 20 : 15

const DrawingButtons = (props) => {
    return (
        <View style={styles.container} >
            <CircleIconButton
                inMuseumMode={props.inMuseumMode}
                disabled={!props.canUndo}
                type="undo"
                activated={false}
                onPress={() => props.onUndoButtonSelected()}
                radius={circleRadius}
            />
            <View style={styles.drawingButtonsContainer}>
                <CircleIconButton
                    inMuseumMode={props.inMuseumMode}
                    style={styles.buttonPadding}
                    type="draw"
                    activated={props.highlightedButton === 'draw'}
                    onPress={() => props.onModeButtonSelected('draw')}
                    radius={circleRadius}
                />
                <CircleIconButton
                    inMuseumMode={props.inMuseumMode}
                    type="erase"
                    activated={props.highlightedButton === 'erase' || props.aShapeIsOutOfBounds}
                    onPress={() => props.onModeButtonSelected('erase')}
                    radius={circleRadius}
                />
            </View>
            {
                props.showHelpButton &&
                <View pointerEvents="box-none" style={styles.needHelpContainer}>
                    <View>
                        <NeedHelpButton
                            onPress={props.onHelpButtonPressed}
                            inMuseumMode={props.inMuseumMode}
                        />
                    </View>
                </View>
            }
        </View>
    )
}

const styles = {
    undoButtonContainer: {
        flex: 1
    },
    container: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    drawingButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonPadding: {
        paddingRight: 15
    },
    needHelpContainer: {
        top: 5,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

DrawingButtons.propTypes = {
    onModeButtonSelected: PropTypes.func,
    onUndoButtonSelected: PropTypes.func,
    highlightedButton: PropTypes.oneOf(['draw', 'erase', 'unselected']),
    canUndo: PropTypes.bool,
    aShapeIsOutOfBounds: PropTypes.bool,
    showHelpButton: PropTypes.bool,
    onHelpButtonPressed: PropTypes.func,
    inMuseumMode: PropTypes.bool,
}

DrawingButtons.defaultProps = {
    showHelpButton: false
}

export default DrawingButtons