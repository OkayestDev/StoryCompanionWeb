import StoryCompanion from '../../../utils/StoryCompanion.js';
import PlotRequests from '../../../utils/PlotRequests.js';

export default class PlotsUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.PlotRequests = new PlotRequests();
        this.getPlots(props);
    }

    componentWillReceiveProps(props) {
        if (this.props.selectedStoryId !== props.selectedStoryId) {
            this.getPlots(props);
        }
    }

    getPlots = props => {
        if (props.selectedStoryId !== null) {
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
}
