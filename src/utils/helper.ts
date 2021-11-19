
/*
* Function used in TextFields as a value. It's purpose is to allow user 
* to remove all content from text field in tables when he edits something
*/
export const v = (stateName: string | number | unknown, originalName: string | number) => stateName || (stateName === '' ? '' : originalName)