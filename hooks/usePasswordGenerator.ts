
import { useState, useCallback } from 'react';
import type { PasswordOptions } from '../types';
import { LOWERCASE_CHARS, UPPERCASE_CHARS, NUMBER_CHARS, SYMBOL_CHARS } from '../constants';

export const usePasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const generatePassword = useCallback(() => {
    let charset = '';
    if (options.includeLowercase) charset += LOWERCASE_CHARS;
    if (options.includeUppercase) charset += UPPERCASE_CHARS;
    if (options.includeNumbers) charset += NUMBER_CHARS;
    if (options.includeSymbols) charset += SYMBOL_CHARS;

    if (charset === '') {
      setPassword('Select at least one character type');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  }, [options]);

  const updateOption = <K extends keyof PasswordOptions>(
    option: K,
    value: PasswordOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [option]: value }));
  };

  return { password, options, generatePassword, updateOption };
};
