import { test, expect } from '@playwright/test';

import fs, { access } from 'fs';

test('TC1001', async ({ page }) => {
  await page.goto('http://118.107.203.38:9082/#/auth/kpj/login');
  await page.getByLabel('Username').fill('doctor1');
  await page.getByLabel('Password').fill('prima');
  await page.getByLabel('Password').press('Enter');
  await page.getByRole('button', { name: 'Register New Patient' }).click();
  await page.getByPlaceholder('Input User Email').fill('abc@gmail.com');
  await page.locator('#patient-title').selectOption('Datuk');
  await page.locator('#patient-first-name').fill('Playshan');

  const timestamp = new Date();
  const patientLastName:string = timestamp.toLocaleString();
  console.log(patientLastName);
  
  // Use patientName in your test
  await page.locator('#patient-last-name').fill(patientLastName);

  await page.locator('#patient-gender').selectOption('1: Object');
  await page.locator('#patient-nric').fill('020222101361');
  await page.locator('#edit-patient-phone-number').first().click();
  await page.getByPlaceholder('-Number-').first().fill('111111111');
  await page.getByRole('button', { name: '' }).click();
  await page.getByLabel('Ethnicity').selectOption('2: CHI');
  await page.getByLabel('Body Weight').fill('70');
  await page.getByLabel('Marital Status').selectOption('1: Object');
  await page.getByLabel('Allergy').fill('Seafood');
  await page.locator('#nok-title').selectOption('Dato');
  await page.locator('#NOK-first-name').fill('test');
  await page.locator('#NOK-last-name').fill('1');
  await page.locator('#NOK-gender').selectOption('2: Object');
  await page.locator('#NOK-nric').click();
  await page.locator('#NOK-nric').fill('010111101361');
  await page.locator('#NOK-phone-number #edit-patient-phone-number').click();
  await page.locator('#NOK-phone-number').getByPlaceholder('-Number-').fill('122222222');
  await page.locator('#NOK-phone-number').getByRole('button', { name: '' }).click();
  await page.getByRole('textbox', { name: 'Address Line 1' }).click();
  await page.getByRole('textbox', { name: 'Address Line 1' }).fill('123');
  await page.getByRole('textbox', { name: 'Address Line 2' }).fill('123');
  await page.getByRole('textbox', { name: 'Address Line 3' }).fill('123');
  await page.getByRole('textbox', { name: 'Postcode' }).fill('123');
  await page.getByRole('textbox', { name: 'City' }).fill('123');
  await page.getByRole('textbox', { name: 'State' }).fill('123');
  await page.locator('#permanent-country').selectOption('1: MY');
  await page.getByText('Different Mailing Address').click();
  await page.locator('#mailing-address1').fill('123');
  await page.locator('#mailing-address2').fill('123');
  await page.locator('#mailing-address3').fill('123');
  await page.locator('#mailing-postcode').fill('123');
  await page.locator('#mailing-city').fill('123');
  await page.locator('#mailing-state').fill('123');
  await page.locator('#mailing-country').selectOption('1: MY');
  await page.locator('#confirm-create-patient').click();
  await page.getByRole('cell', { name: patientLastName }).locator('div').first().click();
  
  // Your existing code to capture ID
  const userId = await page.getByPlaceholder('Leave blank will auto').inputValue();
  console.log(userId);

  // Save the ID to a file
  fs.writeFileSync('patient_details.json', JSON.stringify({ userId }));
});

test('TC1002', async ({ page }) => {
  await page.goto('http://118.107.203.38:9082/#/auth/kpj/login');
  await page.getByLabel('Username').fill('doctor1');
  await page.getByLabel('Password').fill('prima');
  await page.getByLabel('Password').press('Enter');

  // Read ID from JSON file
  const data = JSON.parse(fs.readFileSync('patient_details.json', 'utf-8'));
  const userId = data.userId;
  console.log(userId);

  await page.getByPlaceholder('Search...').fill(userId);
  await page.getByPlaceholder('Search...').press('Enter');
  await page.getByText('New Appointment').first().click();
  await page.getByText('RADIOLOGY').click();
  await page.getByText('CT SCAN').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.locator('.edit-listing > div:nth-child(2)').first().click();
  await page.locator('.d-flex > .edit-row > .d-flex').click();
  await page.getByRole('button', { name: 'Standard' }).click();
  await page.getByRole('button', { name: 'Plain RM' }).click();
  await page.getByRole('spinbutton').fill('80');
  await page.locator('tr:nth-child(21) > td > .calendar_default_cell > .calendar_default_cell_inner').click();
  await page.locator('div').filter({ hasText: /^Patient Indication$/ }).getByRole('textbox').fill('123');
  await page.locator('div').filter({ hasText: /^History$/ }).getByRole('textbox').fill('123');
  await page.getByPlaceholder('LMP Date').fill('2024-10-23');
  await page.getByRole('button', { name: ' ROUTINE' }).click();
  await page.getByRole('button', { name: ' URGENT' }).click();
  await page.locator('textarea').nth(2).fill('123');
  await page.locator('textarea').nth(3).fill('123');
  await page.getByLabel('Upload Document').getByRole('button', { name: '' }).click();
  await page.getByLabel('Payment Mode').getByRole('combobox').selectOption('BILL');
  await page.getByRole('button', { name: 'Submit   ' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();

  // Save the accession no. to a file
  await page.getByRole('link', { name: 'Appointment' }).click();
  const accessionNo = await page.locator('table tr td:nth-child(10) span').first().textContent();
  
  console.log(accessionNo);
  fs.writeFileSync('patient_details.json', JSON.stringify({ accessionNo }));
});

test('TC1003', async ({ page }) => {
  await page.goto('http://118.107.203.38:9080/#/auth/kpj/login');
  await page.getByLabel('Username').fill('prima2');
  await page.getByLabel('Password').fill('prima');
  await page.getByLabel('Password').press('Enter');

  // Read ID from JSON file
  const data = JSON.parse(fs.readFileSync('patient_details.json', 'utf-8'));
  const accessionNo = data.accessionNo;
  console.log(accessionNo);

  await page.locator("[id='searchStudy']").fill(accessionNo);
  await page.getByRole('button', { name: '' }).first().click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
});

// test('TC1004', async ({ page }) => {
//   await page.goto('http://118.107.203.38:9080/#/auth/kpj/login');
//   await page.getByLabel('Username').fill('prima2');
//   await page.getByLabel('Password').fill('prima');
//   await page.getByLabel('Password').press('Enter');

//   // Read ID from JSON file
//   const data = JSON.parse(fs.readFileSync('patient_details.json', 'utf-8'));
//   const accessionNo = data.accessionNo;
//   console.log(accessionNo);

//   await page.locator("[id='searchStudy']").fill(accessionNo);
//   await page.locator("[id='searchStudy']").press('Enter');
//   await page.getByRole('button', { name: '' }).click();
//   await page.getByRole('button', { name: 'Reject' }).click();
//   await page.locator('#reject-reason').fill('123');
//   await page.getByRole('button', { name: 'Confirm' }).click();
// });

test('TC1005', async ({ page }) => {
  await page.goto('http://118.107.203.38:9080/#/auth/kpj/login');
  await page.getByLabel('Username').fill('prima2');
  await page.getByLabel('Password').fill('prima');
  await page.getByLabel('Password').press('Enter');
  await page.getByRole('link', { name: 'Studies' }).click();

  // Read ID from JSON file
  const data = JSON.parse(fs.readFileSync('patient_details.json', 'utf-8'));
  const accessionNo = data.accessionNo;
  console.log(accessionNo);

  await page.getByPlaceholder('Accession No').fill(accessionNo);
  await page.locator('#search-studies').nth(1).click();
  await page.getByText(accessionNo).click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'Pending' }).nth(1).click();
  await page.getByRole('button', { name: 'Patient Arrived' }).click();
});

test('TC1006', async ({ page }) => {
  await page.goto('http://118.107.203.38:9080/#/auth/kpj/login');
  await page.getByLabel('Username').fill('prima2');
  await page.getByLabel('Password').fill('prima');
  await page.getByLabel('Password').press('Enter');
  await page.getByRole('link', { name: 'Studies' }).click();

  // Read ID from JSON file
  const data = JSON.parse(fs.readFileSync('patient_details.json', 'utf-8'));
  const accessionNo = data.accessionNo;
  console.log(accessionNo);
  await page.getByPlaceholder('Accession No').fill(accessionNo);

  await page.locator('#search-studies').nth(1).click();
  await page.getByText(accessionNo).click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'Patient Arrived' }).nth(1).click();
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Mo Radiology' }).click();
  await page.getByRole('button', { name: 'Radiologist' }).click();
  await page.getByRole('button', { name: 'azqarg1' }).click();
  await page.getByRole('button', { name: 'Radiographer' }).click();
  await page.getByRole('button', { name: 'azqarg1', exact: true }).click();
  await page.getByRole('tooltip', { name: 'Referring Doctor Doctor1 ' }).locator('a').nth(4).click();
});

test('TC1007', async ({ page }) => {
  await page.goto('http://118.107.203.38:9080/#/auth/kpj/login');
  await page.getByLabel('Username').fill('prima2');
  await page.getByLabel('Password').fill('prima');
  await page.getByLabel('Password').press('Enter');
  await page.getByRole('link', { name: 'Studies' }).click();

  // Read ID from JSON file
  const data = JSON.parse(fs.readFileSync('patient_details.json', 'utf-8'));
  const accessionNo = data.accessionNo;
  console.log(accessionNo);
  await page.getByPlaceholder('Accession No').fill(accessionNo);

  await page.locator('#search-studies').nth(1).click();
  await page.getByText(accessionNo).click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'Start' }).nth(1).click();
  await page.getByRole('button', { name: 'Complete' }).click();
});

test('TC1008', async ({ page }) => {
  await page.goto('http://118.107.203.38:9080/#/auth/kpj/login');
  await page.getByLabel('Username').fill('prima2');
  await page.getByLabel('Password').fill('prima');
  await page.getByLabel('Password').press('Enter');
  await page.getByRole('link', { name: 'Studies' }).click();

  // Read ID from JSON file
  const data = JSON.parse(fs.readFileSync('patient_details.json', 'utf-8'));
  const accessionNo = data.accessionNo;
  console.log(accessionNo);
  await page.getByPlaceholder('Accession No').fill(accessionNo);

  await page.locator('#search-studies').nth(1).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('row', { name: accessionNo }).locator('a').nth(2).click();
  const page1 = await page1Promise;
  await page1.getByRole('combobox').first().selectOption('HEADER Hospital Banting');
  await page1.getByRole('button', { name: 'Sign' }).click();
});

test('TC1009', async ({ page }) => {
  await page.goto('http://118.107.203.38:9082/#/auth/kpj/login');
  await page.getByLabel('Username').fill('doctor1');
  await page.getByLabel('Password').fill('prima');
  await page.getByLabel('Password').press('Enter');
  await page.getByRole('link', { name: 'Appointment' }).click();

  // Read ID from JSON file
  const data = JSON.parse(fs.readFileSync('patient_details.json', 'utf-8'));
  const accessionNo = data.accessionNo;
  console.log(accessionNo);
  await page.getByPlaceholder('Accession No').fill(accessionNo);

  await page.locator('#search-studies').click();
  const page2Promise = page.waitForEvent('popup');
  await page.locator('.flex > button:nth-child(5)').click();
  const page2 = await page2Promise;
  await page2.getByRole('button', { name: 'Print' }).click();
  await page2.getByRole('button', { name: 'Close' }).click();
});