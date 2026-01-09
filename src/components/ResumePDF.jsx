import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';

// Register a standard font (Times-Roman is built-in, but we can use Helvetica for a cleaner look or stick to Times for LaTeX feel)
// We'll use Times-Roman for that classic LaTeX academic look.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#000',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  contactSection: {
    marginTop: 8,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Times-Bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  contactInfo: {
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 5,
  },
  contactItem: {
    marginHorizontal: 3,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 6,
    paddingBottom: 2,
    letterSpacing: 1,
  },
  jobBlock: {
    marginBottom: 8,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  companyDate: {
    fontSize: 11,
    fontFamily: 'Times-Italic',
  },
  list: {
    marginLeft: 15,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontSize: 14, // Larger bullet
    lineHeight: 1,
  },
  listItemContent: {
    flex: 1,
  },
  skillBlock: {
      marginBottom: 4,
  },
  skillCategory: {
      fontFamily: 'Times-Bold',
  },
  link: {
      color: '#0066cc',
      textDecoration: 'underline',
  }
});

// Helper to parse markdown text
const parseMarkdown = (markdown) => {
  if (!markdown) return { name: '', contactLines: [], bodyLines: [] };

  const lines = markdown.split('\n');
  const elements = [];
  let currentSection = null;
  let currentList = null;

  // Extract Header Info (Name, Email, etc.)
  // Assuming first line is Name
  // Third/Fourth lines are contact info
  
  let name = "";
  let contactLines = [];
  let bodyLines = [];
  
  let isHeader = true;
  for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('## ')) {
          isHeader = false;
      }
      
      if (isHeader) {
          if (line.startsWith('# ')) {
              name = line.replace('# ', '').trim();
          } else if (line.length > 0 && !line.startsWith('---')) {
              contactLines.push(line);
          }
      } else {
          bodyLines.push(line);
      }
  }

  return { name, contactLines, bodyLines };
};

const ResumePDF = ({ markdown }) => {
  const { name, contactLines, bodyLines } = parseMarkdown(markdown);

  // Process Body Content
  const renderContent = () => {
    const content = [];
    let currentSectionTitle = '';
    let currentJobTitle = '';
    let currentCompanyDate = '';
    let listItems = [];

    const flushList = () => {
        if (listItems.length > 0) {
            content.push(
                <View key={`list-${content.length}`} style={styles.list}>
                    {listItems.map((item, idx) => (
                        <View key={idx} style={styles.listItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.listItemContent}>
                                {item}
                            </Text>
                        </View>
                    ))}
                </View>
            );
            listItems = [];
        }
    };

    const flushJob = () => {
        flushList();
        if (currentJobTitle) {
             // If we have a job title but no list, it might be a simple block
             // But usually we have a header then a list.
             // We rendered the header immediately when found, so just flush list.
        }
        currentJobTitle = '';
        currentCompanyDate = '';
    };

    for (let i = 0; i < bodyLines.length; i++) {
        let line = bodyLines[i];
        
        // Skip empty lines or separators
        if (!line || line.startsWith('---')) continue;

        // Section Header
        if (line.startsWith('## ')) {
            flushJob();
            currentSectionTitle = line.replace('## ', '').trim();
            content.push(
                <View key={`section-${content.length}`} style={{ marginTop: 10 }}>
                    <Text style={styles.sectionTitle}>{currentSectionTitle}</Text>
                </View>
            );
            continue;
        }

        // Job Title / Sub-header
        if (line.startsWith('### ')) {
            flushJob();
            // Check next line for Company/Date if it exists
            let title = line.replace('### ', '').replace(/\*\*/g, '').trim();
            let companyDate = '';
            
            // Peek next line for company info (usually starts with *)
            if (bodyLines[i+1] && bodyLines[i+1].trim().startsWith('*')) {
                companyDate = bodyLines[i+1].trim().replace(/\*/g, '');
                i++; // Skip next line
            }

            content.push(
                <View key={`job-${content.length}`} style={styles.jobBlock}>
                    <View style={styles.jobHeader}>
                        <Text style={styles.jobTitle}>{title}</Text>
                        <Text style={styles.companyDate}>{companyDate}</Text>
                    </View>
                </View>
            );
            continue;
        }

        // List Items
        if (line.startsWith('- ')) {
            let text = line.replace('- ', '').trim();
            // Strip markdown formatting for simplicity
            text = text.replace(/\*\*/g, '');
            
            listItems.push(text);
            continue;
        }
        
        // Plain text (Paragraphs, Summary, etc.)
        if (line.length > 0) {
            // If we are in Skills section, we might want special formatting, but for now standard text is fine.
            // If it's just a paragraph line:
            content.push(
                <View key={`text-${content.length}`} style={{ marginBottom: 5 }}>
                    <Text style={{ fontSize: 11, fontFamily: 'Times-Roman' }}>
                        {line}
                    </Text>
                </View>
            );
        }
    }
    flushJob(); // Final flush

    return content;
  };

  // Parse Contact Info to extract Links
  const renderContact = () => {
      // Contact lines from RESUME.md:
      // **Email:** nishanshrestha212@gmail.com | **Phone:** +977 9860943907
      // **LinkedIn:** [linkedin.com/in/shresthanishan](https://linkedin.com/in/shresthanishan) | **GitHub:** [github.com/nishanshrestha04](https://github.com/nishanshrestha04)
      
      return contactLines.map((line, idx) => {
          // Remove **
          let cleanLine = line.replace(/\*\*/g, '');
          
          // Split by | to separate different contact items
          const items = cleanLine.split('|').map(item => item.trim());
          
          return (
              <View key={idx} style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 3, flexWrap: 'wrap' }}>
                  {items.map((item, itemIdx) => {
                      // Extract links: [text](url)
                      const linkMatch = item.match(/\[(.*?)\]\((.*?)\)/);
                      
                      if (linkMatch) {
                          // This item contains a link
                          const label = item.split(':')[0] + ': ';
                          return (
                              <Text key={itemIdx} style={{ fontSize: 10, marginHorizontal: 5 }}>
                                  {label}
                                  <Link src={linkMatch[2]} style={styles.link}>
                                      {linkMatch[1]}
                                  </Link>
                              </Text>
                          );
                      } else {
                          // Plain text like Email: ... or Phone: ...
                          return (
                              <Text key={itemIdx} style={{ fontSize: 10, marginHorizontal: 5 }}>
                                  {item}
                              </Text>
                          );
                      }
                  })}
              </View>
          );
      });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.contactSection}>
            {renderContact()}
          </View>
        </View>
        {renderContent()}
      </Page>
    </Document>
  );
};

export default ResumePDF;
