interface SelectOption {
  value: string;
  label: string;
}

interface UtilityBarConfig {
  selectOptions: SelectOption[];
  buttonConfig?: {
    label: string;
  };
}
