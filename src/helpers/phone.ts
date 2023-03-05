// RAW           "+7( 924)  48 2 71 01"
// NORMALIZED    "+79244827101"
// FORMATTED     "+7 (924) 482-71-01"

const isPhoneNormalized = (phoneNumber: string) => !!phoneNumber.match(/^(\+7)\d{10}$/);

const formatNormalized = (phoneNumber: string) =>
    phoneNumber.replace(/^(?:\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');

const removeNonNormalizedChars = (value: string) => value.replaceAll(/[^\d|+]/g, '');

export const formatNormalizedPhone = (phoneNumber?: string | null) => {
    if (!phoneNumber) {
        return '';
    }

    if (isPhoneNormalized(phoneNumber)) {
        return formatNormalized(phoneNumber);
    }

    return phoneNumber;
};

export const normalizeRawPhone = (phone?: string) => {
    if (!phone) {
        return phone;
    }

    phone = removeNonNormalizedChars(phone);

    if (phone.startsWith('8') && phone.length === 11) {
        return `+7${phone.substring(1)}`;
    }

    if (phone.startsWith('7') && phone.length === 11) {
        return `+${phone}`;
    }

    if (phone.length === 10) {
        return `+7${phone}`;
    }

    return phone;
};

export const validateRawPhone = (str?: string) => isPhoneNormalized(normalizeRawPhone(str) || '');
