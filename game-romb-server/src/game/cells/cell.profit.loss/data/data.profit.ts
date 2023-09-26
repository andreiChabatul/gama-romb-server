import { dataChange } from "src/types";

export const DATA_PROFIT: dataChange = {
    en: [],
    ru: [
        {
            description: ' получает сообщение: Возврат старого займа. Прибыль $100000',
            value: 100000
        },
        {
            description: ' получает сообщение: Вам будут выплачены банковские дивиденды. Прибыль $150000',
            value: 150000
        },
        {
            description: ' получает сообщение: Получение сертификата ISO 9001 повысило уровень лояльности ваших клиентов. Прибыль $200000.',
            value: 200000
        },
        {
            description: ' получает сообщение: Заключение долгосрочных договоров с крупной траспортной компанией снизило расходы на логистику. Прибыль $200000.',
            value: 200000
        }
    ]
}

// Проведение бизнес тренингов для руководителей отделов, потребовало затрат.Сумма затрат 100000
// Разрешение контролирующих органов повлекло представительскте расходы.Сумма затрат 100000
// Конкуренты увели часть клиентов.Сумма убытков 100000