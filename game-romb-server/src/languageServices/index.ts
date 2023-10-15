import { CompanyInfo, PlayerDefaultI, categoryDictionary, dictionary, language } from "src/types";

class LanguageServices {
    lang: language = 'en';
    private dictionary: dictionary = {} as dictionary;

    constructor() {
        this.readDictionary();
    }

    changeLanguage(lang: language): void {
        this.lang = lang;
        this.readDictionary();
    }

    async readDictionary(): Promise<void> {

        const dictionary = (await import(`../dictionary/${this.lang}/dict.json`, {
            assert: {
                type: "json"
            }
        })).default;
        this.dictionary = { ...dictionary };
        console.log(this.dictionary)

    }

    getString(cat: categoryDictionary, str: string, player?: PlayerDefaultI, cellInfo?: CompanyInfo, value?: number): string {
        let resultStr = this.dictionary[cat][str];

        resultStr = (cellInfo)
            ? resultStr.replaceAll('COMPANY', cellInfo.nameCompany.toUpperCase())
                .replaceAll('PRICE', String(cellInfo.priceCompany))
            : resultStr;

        resultStr = (player)
            ? resultStr.replaceAll('PLAYER', player.name)
            : resultStr;

        resultStr = (value)
            ? resultStr.replaceAll('VALUE', String(value))
            : resultStr

        return resultStr;
    }

}

export default new LanguageServices();
