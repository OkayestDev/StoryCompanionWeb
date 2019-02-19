import React from 'react';
import PlotsUtils from './components/PlotsUtils.js';
import EditEntityModal from '../../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import * as plotActions from '../../actions/PlotActions.js';
import EditComponentsNotice from '../../components/EditComponentsNotice.js';
import '../../css/Plots.css';

class Plots extends PlotsUtils {
    constructor(props) {
        super(props);
    }

    oneLineInputs = () => [
        {
            name: 'Plot Name',
            value: this.props.name,
            onChange: this.props.handleNameChanged,
            type: 'default',
        },
    ];

    multiLineInputs = () => [
        {
            name: 'Description',
            value: this.props.description,
            onChange: this.props.handleDescriptionChanged,
        },
    ];

    renderPlot = (styleName = 'parentPlots', id, addIcon = true) => {
        return (
            <div className={'plot ' + styleName} key={id}>
                <div className="plotName" onClick={() => this.props.selectPlot(id)}>
                    {this.props.plots[id].name}
                </div>
                {addIcon && (
                    <Icon
                        className="icon"
                        icon={plus}
                        size={30}
                        data-tip="Add Child Plot"
                        onClick={() => this.props.addChildPlot(id)}
                    />
                )}
            </div>
        );
    };

    renderPlotList = () => {
        if (!this.props.plots) {
            return null;
        }

        let plotIds = Object.keys(this.props.plots);
        if (plotIds.length > 0) {
            let renderedPlots = [];
            plotIds.forEach(id => {
                if (this.props.plots[id].plot !== '') {
                    return;
                } else {
                    renderedPlots.push(this.renderPlot('plotParent', id));
                    let parentOneId = id;
                    // Render Children one
                    plotIds.forEach(idTwo => {
                        if (this.props.plots[idTwo].plot == parentOneId) {
                            renderedPlots.push(this.renderPlot('childOnePlots', idTwo));
                            // Render childrenTwo
                            let parentTwoId = idTwo;
                            plotIds.forEach(idThree => {
                                if (this.props.plots[idThree].plot == parentTwoId) {
                                    renderedPlots.push(
                                        this.renderPlot('childTwoPlots', idThree, false)
                                    );
                                }
                            });
                        } else {
                            return;
                        }
                    });
                }
            });
            return renderedPlots;
        } else {
            return (
                <div className="noEntityContainer">
                    <div className="noEntityText">
                        <div>Looks like you haven't created any plots yet.</div>
                        <div>
                            Press on the &nbsp;
                            <Icon icon={plus} size={30} />
                            &nbsp; to create a new plot.
                        </div>
                    </div>
                </div>
            );
        }
    };

    render() {
        if (this.props.selectedStoryId !== null) {
            return (
                <div className="full">
                    <ReactTooltip delay={500} />
                    <EditEntityModal
                        isEntityModalOpen={this.props.isPlotModalOpen}
                        selectedId={this.props.selectedPlotId}
                        onRequestClose={this.props.closePlotModal}
                        objectName="Plot"
                        title={this.props.selectedPlotId === null ? 'Create a Plot' : 'Edit Plot'}
                        oneLineInputs={this.oneLineInputs()}
                        multiLineInputs={this.multiLineInputs()}
                        onSave={() =>
                            this.props.selectedPlotId === null ? this.createPlot() : this.editPlot()
                        }
                        onDelete={() => this.deletePlot(this.props.selectedPlotId)}
                        showAlert={this.props.showAlert}
                        saveButtonText={
                            this.props.selectedPlotId === null ? 'Create Plot' : 'Edit Plot'
                        }
                        deleteButtonText="Delete Plot"
                        confirmationAction="Delete Plot?"
                    />
                    <Icon
                        className="icon floatRight"
                        icon={plus}
                        size={28}
                        onClick={this.props.newPlot}
                        data-tip="Create a new plot"
                    />
                    <div className="entityContainer">{this.renderPlotList()}</div>
                </div>
            );
        } else {
            return <EditComponentsNotice objectName="plot" />;
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.plotStore,
        selectedStoryId: state.storyStore.selectedStoryId,
        apiKey: state.appStore.apiKey,
    };
}

const mapDispatchToProps = {
    ...plotActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Plots);
