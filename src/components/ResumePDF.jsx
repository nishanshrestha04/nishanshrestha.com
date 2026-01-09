import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

// Styles matching the LaTeX template
const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingTop: 35,
    paddingBottom: 35,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#000',
  },
  
  // Header Styles
  header: {
    marginBottom: 15,
    textAlign: 'center',
  },
  name: {
    fontSize: 26,
    fontFamily: 'Times-Bold',
    marginBottom: 20, // Increased gap between name and links
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactLine: {
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  contactSeparator: {
    marginHorizontal: 4,
  },
  link: {
    color: '#0000EE',
    textDecoration: 'underline',
    fontSize: 10,
  },
  
  // Section Styles (matching LaTeX \section with \titlerule)
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 8,
    paddingBottom: 2,
    borderBottomWidth: 0.8,
    borderBottomColor: '#000',
    letterSpacing: 0.5,
    wrap: false, // Prevent section titles from breaking across pages
  },
  
  // Job/Project Header (matching tabularx with title left, date right)
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
    marginTop: 4,
    wrap: false, // Keep job headers together
  },
  entryTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    flex: 1,
  },
  entryDate: {
    fontSize: 11,
    fontFamily: 'Times-Italic',
    textAlign: 'right',
  },
  
  // List Items (matching itemize with --)
  listContainer: {
    marginLeft: 15,
    marginBottom: 6,
    orphans: 2, // Keep at least 2 lines together
    widows: 2,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 12,
    fontSize: 11,
    marginRight: 3,
  },
  listItemText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.4,
  },
  
  // Summary/Paragraph text
  paragraphText: {
    fontSize: 11,
    marginBottom: 6,
    textAlign: 'justify',
    lineHeight: 1.4,
  },
  
  // Skills Section (matching tabularx with two columns)
  skillRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  skillCategory: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    width: '35%',
  },
  skillList: {
    fontSize: 11,
    flex: 1,
    lineHeight: 1.4,
  },
  
  // Education entries
  educationEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  educationLeft: {
    fontSize: 11,
    flex: 1,
  },
  educationRight: {
    fontSize: 11,
    textAlign: 'right',
  },
  educationInstitution: {
    fontFamily: 'Times-Bold',
  },
  
  // Project description (for single paragraph projects)
  projectDescription: {
    fontSize: 11,
    marginBottom: 8,
    lineHeight: 1.4,
    textAlign: 'justify',
  },
});

// Helper to parse markdown
const parseMarkdown = (markdown) => {
  if (!markdown) return { sections: [] };

  const lines = markdown.split('\n');
  const sections = [];
  let currentSection = null;
  let name = '';
  let contactInfo = [];

  // Parse header (name and contact)
  let i = 0;
  for (; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('# ')) {
      name = line.replace('# ', '').trim();
    } else if (line.startsWith('**GitHub:**') || line.startsWith('**Email:**')) {
      contactInfo.push(line);
    } else if (line.startsWith('## ')) {
      // Start of first section
      break;
    }
  }

  // Parse body sections
  for (; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('## ')) {
      // New section
      if (currentSection) sections.push(currentSection);
      currentSection = {
        title: line.replace('## ', '').trim(),
        content: []
      };
    } else if (currentSection && line && !line.startsWith('---')) {
      currentSection.content.push(line);
    }
  }
  
  if (currentSection) sections.push(currentSection);

  return { name, contactInfo, sections };
};

// Parse contact info to extract links
const parseContactInfo = (contactLines) => {
  const items = [];
  
  contactLines.forEach(line => {
    // Remove ** bold markers
    const cleanLine = line.replace(/\*\*/g, '');
    // Split by |
    const parts = cleanLine.split('|');
    
    parts.forEach(part => {
      const trimmed = part.trim();
      
      // Match pattern: Label: [url](link)
      const labelLinkMatch = trimmed.match(/^(\w+):\s*\[(.*?)\]\((.*?)\)$/);
      if (labelLinkMatch) {
        const label = labelLinkMatch[1]; // e.g., "LinkedIn", "Website", "Email"
        const url = labelLinkMatch[3];
        items.push({ type: 'link', label, url });
      }
      // Match pattern: Label: text (no link)
      else if (trimmed.includes(':')) {
        items.push({ type: 'text', text: trimmed });
      }
      // Plain text
      else if (trimmed) {
        items.push({ type: 'text', text: trimmed });
      }
    });
  });
  
  return items;
};

const ResumePDF = ({ markdown }) => {
  const { name, contactInfo, sections } = parseMarkdown(markdown);
  const contactItems = parseContactInfo(contactInfo);

  // Render contact line with separators (matching LaTeX template)
  const renderContact = () => {
    return (
      <View style={styles.contactLine}>
        {contactItems.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <Text style={styles.contactSeparator}>|</Text>}
            {item.type === 'link' ? (
              <Link src={item.url} style={styles.link}>
                {item.label}
              </Link>
            ) : (
              <Text>{item.text}</Text>
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  // Render section content
  const renderSectionContent = (section) => {
    const content = [];
    let i = 0;
    
    while (i < section.content.length) {
      const line = section.content[i];
      
      // Subsection header (### **Title**)
      if (line.startsWith('###')) {
        const title = line.replace(/###/g, '').replace(/\*\*/g, '').trim();
        let dateInfo = '';
        
        // Check next line for date/company
        if (i + 1 < section.content.length && section.content[i + 1].startsWith('*')) {
          dateInfo = section.content[i + 1].replace(/\*/g, '').trim();
          i++;
        }
        
        content.push(
          <View key={`entry-${i}`} style={styles.entryHeader}>
            <Text style={styles.entryTitle}>{title}</Text>
            <Text style={styles.entryDate}>{dateInfo}</Text>
          </View>
        );
      }
      // List item
      else if (line.startsWith('- ')) {
        const listItems = [];
        while (i < section.content.length && section.content[i].startsWith('- ')) {
          const text = section.content[i].replace(/^- /, '').replace(/\*\*/g, '').trim();
          listItems.push(text);
          i++;
        }
        i--; // Back up one since we'll increment at the end
        
        content.push(
          <View key={`list-${i}`} style={styles.listContainer}>
            {listItems.map((item, idx) => (
              <View key={idx} style={styles.listItem}>
                <Text style={styles.bullet}>–</Text>
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      }
      // Paragraph text (Summary, project descriptions, etc.)
      else if (line.length > 0) {
        // Handle Skills section specially (two-column format)
        if (section.title === 'Skills' && line.includes(':**')) {
          const match = line.match(/\*\*(.*?):\*\*\s*(.*)/);
          if (match) {
            // Remove any remaining ** from the skills list
            const cleanSkills = match[2].replace(/\*\*/g, '');
            content.push(
              <View key={`skill-${i}`} style={styles.skillRow}>
                <Text style={styles.skillCategory}>{match[1]}:</Text>
                <Text style={styles.skillList}>{cleanSkills}</Text>
              </View>
            );
          }
        }
        // Handle Education section
        else if (section.title === 'Education') {
          if (line.startsWith('### **')) {
            // Degree title
            const degree = line.replace(/###/g, '').replace(/\*\*/g, '').trim();
            let institution = '';
            let gpa = '';
            
            // Look ahead for institution and GPA
            if (i + 1 < section.content.length && section.content[i + 1].startsWith('*')) {
              institution = section.content[i + 1].replace(/\*/g, '').trim();
              i++;
            }
            if (i + 1 < section.content.length && section.content[i + 1].includes('GPA:')) {
              gpa = section.content[i + 1].replace(/\*\*/g, '').trim();
              i++;
            }
            
            content.push(
              <View key={`edu-${i}`} style={styles.educationEntry}>
                <Text style={styles.educationLeft}>
                  {degree} at <Text style={styles.educationInstitution}>{institution.split('|')[0]}</Text>
                </Text>
                <Text style={styles.educationRight}>
                  {gpa ? `(${gpa})` : institution.split('|')[1]?.trim() || ''}
                </Text>
              </View>
            );
          } else if (line.includes('GPA:')) {
            // Skip, already handled above
          }
        }
        // Handle Certifications
        else if (section.title === 'Certifications') {
          content.push(
            <View key={`cert-${i}`} style={styles.listItem}>
              <Text style={styles.bullet}>–</Text>
              <Text style={styles.listItemText}>{line.replace(/\*\*/g, '')}</Text>
            </View>
          );
        }
        // Regular paragraph
        else {
          content.push(
            <Text key={`para-${i}`} style={styles.paragraphText}>
              {line.replace(/\*\*/g, '')}
            </Text>
          );
        }
      }
      
      i++;
    }
    
    return content;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header - Name and Contact */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          {renderContact()}
        </View>

        {/* Sections */}
        {sections.map((section, idx) => (
          <View key={idx}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {renderSectionContent(section)}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ResumePDF;
