import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import PlotRequests from '../utils/PlotRequests.js';
import EditEntityModal from '../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { showAlert } from '../store/Actions.js';
import '../css/Plots.css';

class Plots extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            plotParent: '',
            plots: null,
            isPlotModalOpen: false,
            selectedPlotId: null,
        };
        this.PlotRequests = new PlotRequests();
        this.getPlots();
    }

    componentWillReceiveProps(props) {
        if (this.props.selectedStoryId !== props.selectedStoryId) {
            this.getPlots(props);
        }
    }

    getPlots = (props) => {
        if (this.props.selectedStoryId !== null) {
            const paramsObject = this.createParamsObject(props);
            this.PlotRequests.getPlots(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        this.setState({
                            plots: res.success,
                        });
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to fetch plots at this time', 'danger');
                });
        }
    };

    createPlot = () => {
        const paramsObject = this.createParamsObject();
        this.PlotRequests.createPlot(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.setState({
                        isPlotModalOpen: false,
                        plots: res.success,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create plot at this time', 'danger');
            });
    };

    editPlot = () => {
        const paramsObject = this.createParamsObject();
        this.PlotRequests.editPlot(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempPlots = this.state.plots;
                    tempPlots[this.state.selectedPlotId] = res.success;
                    this.setState({
                        plots: tempPlots,
                        isPlotModalOpen: false,
                        selectedPlotId: null,
                        name: '',
                        description: '',
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit plot at this time', 'danger');
            });
    };

    deletePlot = () => {
        const paramsObject = this.createParamsObject();
        this.PlotRequests.deletePlot(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempPlots = this.state.plots;
                    delete tempPlots[this.state.selectedPlotId];
                    this.setState({
                        selectedPlotId: null,
                        plots: tempPlots,
                        isPlotModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to delete plot at this time', 'danger');
            });
    };

    newPlot = () => {
        this.setState({
            isPlotModalOpen: true,
            name: '',
            plotParent: '',
            description: '',
        });
    };

    selectPlotForEdit = id => {
        this.setState({
            isPlotModalOpen: true,
            name: this.state.plots[id].name,
            description: this.state.plots[id].description,
            plotParent: this.state.plots[id].plot,
            selectedPlotId: id,
        });
    };

    selectToAddChildPlot = id => {
        this.setState({
            plotParent: id,
            isPlotModalOpen: true,
            name: '',
            description: '',
            selectedPlotId: null,
        });
    };

    returnPlot = (styleName = 'parentPlots', id, addIcon = true) => {
        return (
            <div className={'plot ' + styleName}>
                <div className="plotName" onClick={() => this.selectPlotForEdit(id)}>
                    {this.state.plots[id].name}
                </div>
                {addIcon && (
                    <Icon
                        className="icon"
                        icon={plus}
                        size={30}
                        data-tip="Add Child Plot"
                        onClick={() => this.selectToAddChildPlot(id)}
                    />
                )}
            </div>
        );
    };

    renderPlots = () => {
        if (this.state.plots === null) {
            return null;
        }

        let plotIds = Object.keys(this.state.plots);
        if (plotIds.length > 0) {
            let renderedPlots = [];
            plotIds.forEach(id => {
                if (this.state.plots[id].plot !== '') {
                    return;
                } else {
                    renderedPlots.push(this.returnPlot('plotParent', id));
                    let parentOneId = id;
                    // Render Children one
                    plotIds.forEach(id => {
                        if (this.state.plots[id].plot === parentOneId) {
                            renderedPlots.push(this.returnPlot('childOnePlots', id));
                            // Render childrenTwo
                            let parentTwoId = id;
                            plotIds.forEach(id => {
                                if (this.state.plots[id].plot === parentTwoId) {
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
            return <div className="full">
                    <ReactTooltip delay={500} />
                    <EditEntityModal isEntityModalOpen={this.state.isPlotModalOpen} selectedId={this.state.selectedPlotId} onRequestClose={() => this.setState(
                                { isPlotModalOpen: false }
                            )} objectName="Plot" title={this.state.selectedPlotId === null ? 'Create a Plot' : 'Edit Plot'} name={this.state.name} nameOnChange={newName => this.setState(
                                { name: newName }
                            )} description={this.state.description} descriptionOnChange={newDescription => this.setState(
                                { description: newDescription }
                            )} onSave={() => (this.state.selectedPlotId === null ? this.createPlot() : this.editPlot())} onDelete={() => this.deletePlot(this.state.selectedPlotId)} showAlert={this.props.showAlert} saveButtonText={this.state.selectedPlotId === null ? 'Create Plot' : 'Edit Plot'} deleteButtonText="Delete Plot" confirmationAction="Delete Plot?" />
                    <Icon className="icon floatRight" icon={plus} size={28} onClick={() => this.newPlot()} data-tip="Create a new plot" />
                    <div className="entityContainer">{this.renderPlots()}</div>
                </div>;
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
        selectedStoryId: state.selectedStoryId,
        apiKey: state.apiKey,
    };
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Plots);
