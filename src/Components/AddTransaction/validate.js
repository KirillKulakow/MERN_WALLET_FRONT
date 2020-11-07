export const validate = ({ category, sum }) => {
	const errors = {};

	if (!category) {
		errors.category = "Выберите категорию!";
	}
	if (!sum) {
		errors.sum = "Введите сумму!";
	} else if (isNaN(Number(sum))) {
		errors.sum = "Введите цифровое значение!";
	}
	if (!!Object.keys(errors).length) {
		return errors;
	} else {
		return "valid";
	}
};
