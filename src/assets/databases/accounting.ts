import { Database } from "./databases";

const initEmployees = `
    CREATE TABLE employees(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        last_name VARCHAR(20) NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        title VARCHAR(30),
        reports_to INTEGER,
        birth_date TIMESTAMP,
        hire_date TIMESTAMP,
        address VARCHAR(70),
        city VARCHAR(40),
        state VARCHAR(40),
        country VARCHAR(40),
        postal_code VARCHAR(10),
        phone VARCHAR(24),
        fax VARCHAR(24),
        email VARCHAR(60),
        FOREIGN KEY (reports_to) REFERENCES employees (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );
    INSERT INTO employees (last_name, first_name, title, birth_date, hire_date, address, city, state, country, postal_code, phone, fax, email) VALUES ('Adams', 'Andrew', 'General Manager', '1962-02-18 00:00:00', '2002-08-14 00:00:00', '11120 Jasper Ave NW', 'Edmonton', 'AB', 'Canada', 'T5K 2N1', '+1 (780) 428-9482', '+1 (780) 428-3457', 'andrew@chinookcorp.com');
    INSERT INTO employees (last_name, first_name, title, reports_to, birth_date, hire_date, address, city, state, country, postal_code, phone, fax, email) VALUES ('Edwards', 'Nancy', 'Sales Manager', 1, '1958-12-08 00:00:00', '2002-05-01 00:00:00', '825 8 Ave SW', 'Calgary', 'AB', 'Canada', 'T2P 2T3', '+1 (403) 262-3443', '+1 (403) 262-3322', 'nancy@chinookcorp.com');
    INSERT INTO employees (last_name, first_name, title, reports_to, birth_date, hire_date, address, city, state, country, postal_code, phone, fax, email) VALUES ('Peacock', 'Jane', 'Sales Support Agent', 2, '1973-08-29 00:00:00', '2002-04-01 00:00:00', '1111 6 Ave SW', 'Calgary', 'AB', 'Canada', 'T2P 5M5', '+1 (403) 262-3443', '+1 (403) 262-6712', 'jane@chinookcorp.com');
    INSERT INTO employees (last_name, first_name, title, reports_to, birth_date, hire_date, address, city, state, country, postal_code, phone, fax, email) VALUES ('Park', 'Margaret', 'Sales Support Agent', 2, '1947-09-19 00:00:00', '2003-05-03 00:00:00', '683 10 Street SW', 'Calgary', 'AB', 'Canada', 'T2P 5G3', '+1 (403) 263-4423', '+1 (403) 263-4289', 'margaret@chinookcorp.com');
    INSERT INTO employees (last_name, first_name, title, reports_to, birth_date, hire_date, address, city, state, country, postal_code, phone, fax, email) VALUES ('Johnson', 'Steve', 'Sales Support Agent', 2, '1965-03-03 00:00:00', '2003-10-17 00:00:00', '7727B 41 Ave', 'Calgary', 'AB', 'Canada', 'T3B 1Y7', '1 (780) 836-9987', '1 (780) 836-9543', 'steve@chinookcorp.com');
    INSERT INTO employees (last_name, first_name, title, reports_to, birth_date, hire_date, address, city, state, country, postal_code, phone, fax, email) VALUES ('Mitchell', 'Michael', 'IT Manager', 1, '1973-07-01 00:00:00', '2003-10-17 00:00:00', '5827 Bowness Road NW', 'Calgary', 'AB', 'Canada', 'T3B 0C5', '+1 (403) 246-9887', '+1 (403) 246-9899', 'michael@chinookcorp.com');
    INSERT INTO employees (last_name, first_name, title, reports_to, birth_date, hire_date, address, city, state, country, postal_code, phone, fax, email) VALUES ('King', 'Robert', 'IT Staff', 6, '1970-05-29 00:00:00', '2004-01-02 00:00:00', '590 Columbia Boulevard West', 'Lethbridge', 'AB', 'Canada', 'T1K 5N8', '+1 (403) 456-9986', '+1 (403) 456-8485', 'robert@chinookcorp.com');
    INSERT INTO employees (last_name, first_name, title, reports_to, birth_date, hire_date, address, city, state, country, postal_code, phone, fax, email) VALUES ('Callahan', 'Laura', 'IT Staff', 6, '1968-01-09 00:00:00', '2004-03-04 00:00:00', '923 7 ST NW', 'Lethbridge', 'AB', 'Canada', 'T1H 1Y8', '+1 (403) 467-3351', '+1 (403) 467-8772', 'laura@chinookcorp.com');
`;

const initCustomers = `
    CREATE TABLE customers(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(40) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        company VARCHAR(80),
        address VARCHAR(70),
        city VARCHAR(40),
        state VARCHAR(40),
        country VARCHAR(40),
        postal_code VARCHAR(10),
        phone VARCHAR(24),
        fax VARCHAR(24),
        email VARCHAR(60) NOT NULL,
        support_rep_id INTEGER,
        FOREIGN KEY (support_rep_id) REFERENCES employees (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );
    INSERT INTO customers (first_name, last_name, company, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Luís', 'Gonçalves', 'Embraer - Empresa Brasileira de Aeronáutica S.A.', 'Av. Brigadeiro Faria Lima, 2170', 'São José dos Campos', 'SP', 'Brazil', '12227-000', '+55 (12) 3923-5555', '+55 (12) 3923-5566', 'luisg@embraer.com.br', 3);
    INSERT INTO customers (first_name, last_name, address, city, country, postal_code, phone, email, support_rep_id) VALUES ('Leonie', 'Köhler', 'Theodor-Heuss-Straße 34', 'Stuttgart', 'Germany', '70174', '+49 0711 2842222', 'leonekohler@surfeu.de', 5);
    INSERT INTO customers (first_name, last_name, address, city, state, country, postal_code, phone, email, support_rep_id) VALUES ('François', 'Tremblay', '1498 rue Bélanger', 'Montréal', 'QC', 'Canada', 'H2G 1A7', '+1 (514) 721-4711', 'ftremblay@gmail.com', 3);
    INSERT INTO customers (first_name, last_name, address, city, country, postal_code, phone, email, support_rep_id) VALUES ('Bjørn', 'Hansen', 'Ullevålsveien 14', 'Oslo', 'Norway', '0171', '+47 22 44 22 22', 'bjorn.hansen@yahoo.no', 4);
    INSERT INTO customers (first_name, last_name, company, address, city, country, postal_code, phone, fax, email, support_rep_id) VALUES ('František', 'Wichterlová', 'JetBrains s.r.o.', 'Klanova 9/506', 'Prague', 'Czech Republic', '14700', '+420 2 4172 5555', '+420 2 4172 5555', 'frantisekw@jetbrains.com', 4);
    INSERT INTO customers (first_name, last_name, address, city, country, postal_code, phone, email, support_rep_id) VALUES ('Helena', 'Holý', 'Rilská 3174/6', 'Prague', 'Czech Republic', '14300', '+420 2 4177 0449', 'hholy@gmail.com', 5);
    INSERT INTO customers (first_name, last_name, address, city, country, postal_code, phone, email, support_rep_id) VALUES ('Astrid', 'Gruber', 'Rotenturmstraße 4, 1010 Innere Stadt', 'Vienne', 'Austria', '1010', '+43 01 5134505', 'astrid.gruber@apple.at', 5);
    INSERT INTO customers (first_name, last_name, address, city, country, postal_code, phone, email, support_rep_id) VALUES ('Daan', 'Peeters', 'Grétrystraat 63', 'Brussels', 'Belgium', '1000', '+32 02 219 03 03', 'daan_peeters@apple.be', 4);
    INSERT INTO customers (first_name, last_name, address, city, country, postal_code, phone, email, support_rep_id) VALUES ('Kara', 'Nielsen', 'Sønder Boulevard 51', 'Copenhagen', 'Denmark', '1720', '+453 3331 9991', 'kara.nielsen@jubii.dk', 4);
    INSERT INTO customers (first_name, last_name, company, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Eduardo', 'Martins', 'Woodstock Discos', 'Rua Dr. Falcão Filho, 155', 'São Paulo', 'SP', 'Brazil', '01007-010', '+55 (11) 3033-5446', '+55 (11) 3033-4564', 'eduardo@woodstock.com.br', 4);
    INSERT INTO customers (first_name, last_name, company, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Alexandre', 'Rocha', 'Banco do Brasil S.A.', 'Av. Paulista, 2022', 'São Paulo', 'SP', 'Brazil', '01310-200', '+55 (11) 3055-3278', '+55 (11) 3055-8131', 'alero@uol.com.br', 5);
    INSERT INTO customers (first_name, last_name, company, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Roberto', 'Almeida', 'Riotur', 'Praça Pio X, 119', 'Rio de Janeiro', 'RJ', 'Brazil', '20040-020', '+55 (21) 2271-7000', '+55 (21) 2271-7070', 'roberto.almeida@riotur.gov.br', 3);
    INSERT INTO customers (first_name, last_name, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Fernanda', 'Ramos', 'Qe 7 Bloco G', 'Brasília', 'DF', 'Brazil', '71020-677', '+55 (61) 3363-5547', '+55 (61) 3363-7855', 'fernadaramos4@uol.com.br', 4);
    INSERT INTO customers (first_name, last_name, company, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Mark', 'Philips', 'Telus', '8210 111 ST NW', 'Edmonton', 'AB', 'Canada', 'T6G 2C7', '+1 (780) 434-4554', '+1 (780) 434-5565', 'mphilips12@shaw.ca', 5);
    INSERT INTO customers (first_name, last_name, company, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Jennifer', 'Peterson', 'Rogers Canada', '700 W Pender Street', 'Vancouver', 'BC', 'Canada', 'V6C 1G8', '+1 (604) 688-2255', '+1 (604) 688-8756', 'jenniferp@rogers.ca', 3);
    INSERT INTO customers (first_name, last_name, company, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Frank', 'Harris', 'Google Inc.', '1600 Amphitheatre Parkway', 'Mountain View', 'CA', 'USA', '94043-1351', '+1 (650) 253-0000', '+1 (650) 253-0000', 'fharris@google.com', 4);
    INSERT INTO customers (first_name, last_name, company, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Jack', 'Smith', 'Microsoft Corporation', '1 Microsoft Way', 'Redmond', 'WA', 'USA', '98052-8300', '+1 (425) 882-8080', '+1 (425) 882-8081', 'jacksmith@microsoft.com', 5);
    INSERT INTO customers (first_name, last_name, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Michelle', 'Brooks', '627 Broadway', 'New York', 'NY', 'USA', '10012-2612', '+1 (212) 221-3546', '+1 (212) 221-4679', 'michelleb@aol.com', 3);
    INSERT INTO customers (first_name, last_name, company, address, city, state, country, postal_code, phone, fax, email, support_rep_id) VALUES ('Tim', 'Goyer', 'Apple Inc.', '1 Infinite Loop', 'Cupertino', 'CA', 'USA', '95014', '+1 (408) 996-1010', '+1 (408) 996-1011', 'tgoyer@apple.com', 3);
    INSERT INTO customers (first_name, last_name, address, city, state, country, postal_code, phone, email, support_rep_id) VALUES ('Dan', 'Miller', '541 Del Medio Avenue', 'Mountain View', 'CA', 'USA', '94040-111', '+1 (650) 644-3358', 'dmiller@comcast.com', 4);
    INSERT INTO customers (first_name, last_name, address, city, state, country, postal_code, phone, email, support_rep_id) VALUES ('Kathy', 'Chase', '801 W 4th Street', 'Reno', 'NV', 'USA', '89503', '+1 (775) 223-7665', 'kachase@hotmail.com', 5);
    INSERT INTO customers (first_name, last_name, address, city, state, country, postal_code, phone, email, support_rep_id) VALUES ('Heather', 'Leacock', '120 S Orange Ave', 'Orlando', 'FL', 'USA', '32801', '+1 (407) 999-7788', 'hleacock@gmail.com', 4);
    INSERT INTO customers (first_name, last_name, address, city, state, country, postal_code, phone, email, support_rep_id) VALUES ('John', 'Gordon', '69 Salem Street', 'Boston', 'MA', 'USA', '2113', '+1 (617) 522-1333', 'johngordon22@yahoo.com', 4);
    INSERT INTO customers (first_name, last_name, address, city, state, country, postal_code, phone, email, support_rep_id) VALUES ('Frank', 'Ralston', '162 E Superior Street', 'Chicago', 'IL', 'USA', '60611', '+1 (312) 332-3232', 'fralston@gmail.com', 3);
`;
const initInvoices = `
    CREATE TABLE invoices(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        invoice_date TIMESTAMP NOT NULL,
        billing_address VARCHAR(70),
        billing_city VARCHAR(40),
        billing_state VARCHAR(40),
        billing_country VARCHAR(40),
        billing_postal_code VARCHAR(10),
        total NUMERIC(10,2) NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (2, '2007-01-01 00:00:00', 'Theodor-Heuss-Straße 34', 'Stuttgart', 'Germany', '70174', 1.98);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (4, '2007-01-02 00:00:00', 'Ullevålsveien 14', 'Oslo', 'Norway', '0171', 3.96);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (8, '2007-01-03 00:00:00', 'Grétrystraat 63', 'Brussels', 'Belgium', '1000', 5.94);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (14, '2007-01-06 00:00:00', '8210 111 ST NW', 'Edmonton', 'AB', 'Canada', 'T6G 2C7', 8.91);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (23, '2007-01-11 00:00:00', '69 Salem Street', 'Boston', 'MA', 'USA', '2113', 13.86);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (37, '2007-01-19 00:00:00', 'Berger Straße 10', 'Frankfurt', 'Germany', '60316', 0.99);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (38, '2007-02-01 00:00:00', 'Barbarossastraße 19', 'Berlin', 'Germany', '10779', 1.98);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (40, '2007-02-01 00:00:00', '8, Rue Hanovre', 'Paris', 'France', '75002', 1.98);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (42, '2007-02-02 00:00:00', '9, Place Louis Barthou', 'Bordeaux', 'France', '33000', 3.96);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, total) VALUES (46, '2007-02-03 00:00:00', '3 Chatham Street', 'Dublin', 'Dublin', 'Ireland', 5.94);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (52, '2007-02-06 00:00:00', '202 Hoxton Street', 'London', 'United Kingdom', 'N1 5LH', 8.91);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (2, '2007-02-11 00:00:00', 'Theodor-Heuss-Straße 34', 'Stuttgart', 'Germany', '70174', 13.86);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (16, '2007-02-19 00:00:00', '1600 Amphitheatre Parkway', 'Mountain View', 'CA', 'USA', '94043-1351', 0.99);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (17, '2007-03-04 00:00:00', '1 Microsoft Way', 'Redmond', 'WA', 'USA', '98052-8300', 1.98);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (19, '2007-03-04 00:00:00', '1 Infinite Loop', 'Cupertino', 'CA', 'USA', '95014', 1.98);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (21, '2007-03-05 00:00:00', '801 W 4th Street', 'Reno', 'NV', 'USA', '89503', 3.96);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (25, '2007-03-06 00:00:00', '319 N. Frances Street', 'Madison', 'WI', 'USA', '53703', 5.94);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (31, '2007-03-09 00:00:00', '194A Chain Lake Drive', 'Halifax', 'NS', 'Canada', 'B3S 1C5', 8.91);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (40, '2007-03-14 00:00:00', '8, Rue Hanovre', 'Paris', 'France', '75002', 13.86);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (54, '2007-03-22 00:00:00', '110 Raeburn Pl', 'Edinburgh ', 'United Kingdom', 'EH4 1HH', 0.99);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (55, '2007-04-04 00:00:00', '421 Bourke Street', 'Sidney', 'NSW', 'Australia', '2010', 1.98);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, total) VALUES (57, '2007-04-04 00:00:00', 'Calle Lira, 198', 'Santiago', 'Chile', 1.98);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (59, '2007-04-05 00:00:00', '3,Raj Bhavan Road', 'Bangalore', 'India', '560001', 3.96);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_country, billing_postal_code, total) VALUES (4, '2007-04-06 00:00:00', 'Ullevålsveien 14', 'Oslo', 'Norway', '0171', 5.94);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (10, '2007-04-09 00:00:00', 'Rua Dr. Falcão Filho, 155', 'São Paulo', 'SP', 'Brazil', '01007-010', 8.91);
    INSERT INTO invoices (customer_id, invoice_date, billing_address, billing_city, billing_state, billing_country, billing_postal_code, total) VALUES (19, '2007-04-14 00:00:00', '1 Infinite Loop', 'Cupertino', 'CA', 'USA', '95014', 13.86);
`;

export const accounting: Database = {
  name: "accounting",
  initSql: `${initEmployees}${initCustomers}${initInvoices}`,
  tables: {},
};
