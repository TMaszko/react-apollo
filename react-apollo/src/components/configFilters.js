import { toCamelCaseRemoveColonAndSpaces } from './helper'
const configFiltersLabel = [{ singleValue: true, label:'Product Type'},{singleValue:false, label: 'Vendor'},{singleValue:false, label:"Tags"}];
const addColon = label => label +':';
const pluralizeLabel = monolabel => {
	const pluralizedPartOfLabels = monolabel.split(' ').map(partOfLabel => partOfLabel.charAt(partOfLabel.length - 1) === 's' ? partOfLabel: partOfLabel+'s')
	return pluralizedPartOfLabels.join(' ');
}

const configPluralizedFiltersLabels = configFiltersLabel.map(({label,singleValue}) => ({singleValue, label:pluralizeLabel(label)}))
										.map(({label,singleValue}) => ({singleValue ,label: addColon(label)}));
export const configFilters = configPluralizedFiltersLabels.map((filterLabel,i) => {
	return {
		nameOfPropertyToCompareWith: toCamelCaseRemoveColonAndSpaces(configFiltersLabel[i].label),
		title: filterLabel.label,
		pluralForm: toCamelCaseRemoveColonAndSpaces(filterLabel.label),
		singleValue: filterLabel.singleValue
	}
})