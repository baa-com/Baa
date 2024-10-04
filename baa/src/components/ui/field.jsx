import { Field as ChakraField } from "@chakra-ui/react";
import { forwardRef } from "react";

export const Field = forwardRef(function Field(props, ref) {
	const { label, children, helperText, errorText, asterisk, ...rest } = props;
	return (
		<ChakraField.Root ref={ref} {...rest}>
			{label && (
				<ChakraField.Label fontSize="inherit">
					{label} {asterisk && <ChakraField.RequiredIndicator />}
				</ChakraField.Label>
			)}
			{helperText && (
				<ChakraField.HelperText alignSelf="start" fontSize="md">
					{helperText}
				</ChakraField.HelperText>
			)}
			{children}
			{errorText && (
				<ChakraField.ErrorText fontSize="md">{errorText}</ChakraField.ErrorText>
			)}
		</ChakraField.Root>
	);
});
