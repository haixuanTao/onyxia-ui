import { connect } from 'react-redux';
import vignettes from './vignettes';
import { store } from 'js/redux/store';
import Visite from './visite-guidee.component';

const { setServiceSelected, creerNouveauService } = store;

const mapStateToProps = (state) => {
	const { visite } = state.app;
	const { catalogue, mesServices } = state.myLab;

	return {
		visite,
		etapes: vignettes,
		firstService: catalogue.length > 0 ? catalogue[0] : null,
		serviceCree: mesServices.find(
			(s) => s.labels.ONYXIA_TITLE === 'rstudio-example'
		),
	};
};

const mapToDispatchToProps = (d) => ({
	setFirstService: (firstService) => {
		d(setServiceSelected(firstService));
	},
	creerPremier: () => {
		d(
			creerNouveauService(
				{
					name: 'rstudio',
					catalogId: 'inseefrlab-datascience',
					currentVersion: 10,
				},
				{
					onyxia: { friendly_name: 'rstudio-example' },
					service: { cpus: 0.2, mem: 1024 },
				}
			)
		);
	},
});

export default connect(mapStateToProps, mapToDispatchToProps)(Visite);
