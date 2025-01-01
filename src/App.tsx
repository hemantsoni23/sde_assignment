import '@mantine/core/styles.css';
import { MantineProvider, Table, Button, Container, Group, Title, Text } from '@mantine/core';
import data from './assets/Manufac _ India Agro Dataset.json';
import { aggregateYearlyProduction, aggregateCropData } from './lib/utils';
import { useState } from 'react';
import BarChart from './components/BarChart';

export default function App() {
  const yearlyProduction = aggregateYearlyProduction(data);
  const cropData = aggregateCropData(data);

  const [activeTable, setActiveTable] = useState<'yearly' | 'crop'>('yearly');

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title order={1} align="center">India Agro Data Dashboard</Title>
        </header>

        <Group position="center" style={{ marginBottom: '1rem' }}>
          <Button
            variant={activeTable === 'yearly' ? 'filled' : 'outline'}
            onClick={() => setActiveTable('yearly')}
          >
            Yearly Production
          </Button>
          <Button
            variant={activeTable === 'crop' ? 'filled' : 'outline'}
            onClick={() => setActiveTable('crop')}
          >
            Crop Averages
          </Button>
        </Group>

        {activeTable === 'yearly' && (
          <>
            <Title order={2} style={{ marginBottom: '1rem' }}>Yearly Crop Production</Title>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Year</Table.Th>
                  <Table.Th>Crop with Maximum Production</Table.Th>
                  <Table.Th>Crop with Minimum Production</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {yearlyProduction.map((item) => (
                  <Table.Tr key={item.year}>
                    <Table.Td>{item.year}</Table.Td>
                    <Table.Td>{item.maxCrop}</Table.Td>
                    <Table.Td>{item.minCrop}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </>
        )}

        {activeTable === 'crop' && (
          <>
            <Title order={2} style={{ marginBottom: '1rem' }}>Crop Averages (1950-2020)</Title>
            <BarChart cropData={cropData} />
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Crop</Table.Th>
                  <Table.Th>Average Yield (Kg/Ha)</Table.Th>
                  <Table.Th>Average Cultivation Area (Ha)</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {cropData.map((item) => (
                  <Table.Tr key={item.crop}>
                    <Table.Td>{item.crop}</Table.Td>
                    <Table.Td>{item.avgYield}</Table.Td>
                    <Table.Td>{item.avgArea}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </>
        )}
      </Container>
    </MantineProvider>
  );
}
