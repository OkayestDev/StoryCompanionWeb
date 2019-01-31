import React from 'react';
import PlotsUtils from './components/PlotsUtils.js';
import EditEntityModal from '../../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import * as plotActions from '../../actions/PlotActions.js';
import '../../css/Plots.css';

class Plots extends PlotsUtils {
    constructor(props) {
        super(props);
    }

    returnPlot = (styleName = 'parentPlots', id, addIcon = true) => {
        return (
            <div className={'plot ' + styleName}>
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

    renderPlots = () => {
        if (this.props.plots === null) {
            return null;
        }

        let plotIds = Object.keys(this.props.plots);
        if (plotIds.length > 0) {
            let renderedPlots = [];
            plotIds.forEach(id => {
                if (this.props.plots[id].plot !== '') {
                    return;
                } else {
                    renderedPlots.push(this.returnPlot('plotParent', id));
                    let parentOneId = id;
                    // Render Children one
                    plotIds.forEach(id => {
                        if (this.props.plots[id].plot === parentOneId) {
                            renderedPlots.push(this.returnPlot('childOnePlots', id));
                            // Render childrenTwo
                            let parentTwoId = id;
                            plotIds.forEach(id => {
                                if (this.props.plots[id].plot === parentTwoId) {
                                    renderedPlots.push(this.returnPlot('childTwoPlots', id, false));
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
                        name={this.props.name}
                        nameOnChange={this.props.handleNameChanged}
                        description={this.props.description}
                        descriptionOnChange={this.props.handleDescriptionChanged}
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
                        onClick={() => this.newPlot()}
                        data-tip="Create a new plot"
                    />
                    <div className="entityContainer">{this.renderPlots()}</div>
                </div>
            );
        } else {
            return (
                <div className="editComponentsText">
                    Edit Components of a story to begin creating plots
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.plotsStore,
        selectedStoryId: state.storiesStore.selectedStoryId,
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
